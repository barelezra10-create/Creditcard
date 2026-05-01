export function IconSecured({ className }: { className?: string }) {
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
      {/* Shield outline: rounded top, pointed bottom */}
      <path d="M12 2l8 3.5V12c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V5.5L12 2Z" />
      {/* Keyhole: circle on top + triangle/stem below, green accent */}
      <circle cx="12" cy="10" r="2.5" fill="#16A34A" stroke="#16A34A" strokeWidth={1} />
      <path
        d="M10.5 12.5l1.5 4 1.5-4"
        fill="#16A34A"
        stroke="#16A34A"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
