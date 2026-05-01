export function IconBusiness({ className }: { className?: string }) {
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
      {/* Briefcase outline */}
      <rect x="2" y="8" width="20" height="13" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      {/* Center clasp line */}
      <path d="M2 13h20" />
      {/* Three bar chart bars inside briefcase, navy fill */}
      <rect x="6.5" y="14.5" width="2" height="4" rx="0.5" fill="#1E3A5F" stroke="none" />
      <rect x="11" y="13" width="2" height="5.5" rx="0.5" fill="#1E3A5F" stroke="none" />
      <rect x="15.5" y="15.5" width="2" height="3" rx="0.5" fill="#1E3A5F" stroke="none" />
    </svg>
  );
}
