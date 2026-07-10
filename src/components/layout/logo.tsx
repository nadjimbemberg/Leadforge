export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#211D18" />
      <rect x="7" y="20" width="18" height="3" rx="1.5" fill="#BC5B39" />
      <rect x="10" y="15" width="12" height="3" rx="1.5" fill="#BC5B39" opacity="0.75" />
      <rect x="13" y="10" width="6" height="3" rx="1.5" fill="#BC5B39" opacity="0.5" />
    </svg>
  )
}

export function Wordmark({ size = 15, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span
      className="font-serif italic tracking-tight"
      style={{ fontSize: size, fontWeight: 500, color: dark ? '#F8F4EC' : '#211D18' }}
    >
      Lead<span style={{ color: '#BC5B39' }}>Forge</span>
    </span>
  )
}
