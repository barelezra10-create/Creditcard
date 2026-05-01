export function IconTravel({ className }: { className?: string }) {
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
      {/* Plane silhouette angled upward ~30deg, filled in currentColor */}
      <path
        d="M3 17l3-3 2 1 7-8 1 3 3-1-6 9-2-1-1 2-2-1-1 2z"
        fill="currentColor"
        stroke="none"
      />
      {/* Trajectory arc behind plane, dashed in amber */}
      <path
        d="M4 19 Q10 12 18 6"
        stroke="#F59E0B"
        strokeWidth={1.5}
        strokeDasharray="2 2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Small dots suggesting distance trail */}
      <circle cx="19" cy="5" r="1" fill="#F59E0B" stroke="none" />
      <circle cx="21" cy="4" r="0.75" fill="#F59E0B" stroke="none" />
    </svg>
  );
}
