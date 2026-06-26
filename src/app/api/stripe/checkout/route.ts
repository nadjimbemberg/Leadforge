import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICES: Record<string, Record<string, string>> = {
  STARTER: {
    MONTHLY: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID ?? '',
    YEARLY: process.env.STRIPE_STARTER_YEARLY_PRICE_ID ?? '',
  },
  PRO: {
    MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? '',
    YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID ?? '',
  },
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const payload = await verifyAccessToken(token)
    if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })

    const { plan, billingCycle } = await request.json()
    const priceId = PRICES[plan]?.[billingCycle]
    if (!priceId) return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })

    const user = await db.user.findUnique({ where: { id: payload.userId } })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    let customerId = user.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      await db.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?cancelled=true`,
      metadata: { userId: user.id, plan, billingCycle },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
