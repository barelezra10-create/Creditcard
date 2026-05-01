export function IconCashBack({ className }: { className?: string }) {
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
      {/* Circular arrow: 270-degree arc rotating around center */}
      <path d="M21 12a9 9 0 1 1-9-9" />
      {/* Arrow head at top of arc pointing clockwise */}
      <path d="M12 3l3 3-3 3" />
      {/* Dollar sign in center, green accent */}
      <path
        d="M12 8v1m0 6v1m-1.5-5.5a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5a1.5 1.5 0 0 1-3 0"
        stroke="#16A34A"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
