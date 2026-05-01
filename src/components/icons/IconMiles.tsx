export function IconMiles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Compass rose: 4 arms */}
      {/* North arm (tall diamond tip) */}
      <path d="M12 2l2.5 5.5L12 10l-2.5-2.5L12 2Z" fill="currentColor" stroke="none" />
      {/* South arm */}
      <path d="M12 22l-2.5-5.5L12 14l2.5 2.5L12 22Z" fill="currentColor" stroke="none" />
      {/* East arm */}
      <path d="M22 12l-5.5 2.5L14 12l2.5-2.5L22 12Z" fill="currentColor" stroke="none" />
      {/* West arm */}
      <path d="M2 12l5.5-2.5L10 12l-2.5 2.5L2 12Z" fill="currentColor" stroke="none" />
      {/* Center diamond accent in amber */}
      <circle cx="12" cy="12" r="2.5" fill="#F59E0B" stroke="none" />
      {/* Thin ring outline */}
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth={1} strokeDasharray="2 2" fill="none" />
    </svg>
  );
}
