export function IconBestCards({ className }: { className?: string }) {
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
      {/* Trophy cup body */}
      <path d="M6 2h12v8a6 6 0 0 1-12 0V2Z" />
      {/* Trophy handles */}
      <path d="M6 5H3a2 2 0 0 0 0 4h3" />
      <path d="M18 5h3a2 2 0 0 1 0 4h-3" />
      {/* Trophy stem and base */}
      <path d="M12 16v3" />
      <path d="M8 19h8" />
      {/* Inner checkmark accent in amber */}
      <path
        d="M9 7.5l2 2 4-3.5"
        stroke="#F59E0B"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
