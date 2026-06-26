export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#0F1A2E" />
      <rect x="7" y="22" width="18" height="3" rx="1.5" fill="#2563EB" />
      <rect x="10" y="19" width="12" height="3" rx="1" fill="#3B82F6" />
      <rect x="6" y="9" width="12" height="6" rx="2" fill="#60A5FA" />
      <rect x="16" y="11" width="10" height="2.5" rx="1.25" fill="#93C5FD" />
      <circle cx="10" cy="8" r="1.2" fill="#DBEAFE" opacity="0.9" />
      <circle cx="13" cy="6" r="0.8" fill="#DBEAFE" opacity="0.6" />
      <circle cx="7" cy="6.5" r="0.6" fill="#DBEAFE" opacity="0.5" />
    </svg>
  )
}
