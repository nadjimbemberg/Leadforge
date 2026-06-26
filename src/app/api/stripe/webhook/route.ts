import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 })
  }
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, plan, billingCycle } = session.metadata ?? {}
        if (userId && plan) {
          await db.user.update({
            where: { id: userId },
            data: {
              plan: plan as 'STARTER' | 'PRO' | 'UNLIMITED',
              billingCycle: (billingCycle ?? 'MONTHLY') as 'MONTHLY' | 'YEARLY',
              stripeSubId: session.subscription as string,
              planExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            },
          })
        }
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.userId
        if (userId) {
          await db.user.update({
            where: { id: userId },
            data: { plan: 'STARTER', stripeSubId: null, planExpiresAt: null },
          })
        }
        break
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Erreur traitement' }, { status: 500 })
  }
}
