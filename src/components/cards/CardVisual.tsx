import { cn } from "@/lib/cn";
import type { Card } from "@/lib/cards/types";

// Static map of slug -> public image path.
// Add entries here as new card images are added to public/images/cards/.
const CARD_IMAGES: Record<string, string> = {
  "citi-double-cash": "/images/cards/citi-double-cash.webp",
  "chase-sapphire-preferred": "/images/cards/chase-sapphire-preferred.png",
  "discover-it-secured": "/images/cards/discover-it-secured.png",
  "chase-ink-business-cash": "/images/cards/chase-ink-business-cash.png",
  "discover-it-student-cash": "/images/cards/discover-it-student-cash.png",
};

const ISSUER_GRADIENTS: Record<string, string> = {
  Chase: "from-blue-900 to-blue-700",
  Citi: "from-slate-900 to-slate-700",
  Discover: "from-orange-600 to-orange-400",
  Amex: "from-emerald-700 to-emerald-500",
  "Capital One": "from-rose-800 to-rose-600",
};

const SIZE_CLASSES = {
  sm: "w-44",
  md: "w-72",
  lg: "w-96",
} as const;

export function CardVisual({ card, size = "md" }: { card: Card; size?: "sm" | "md" | "lg" }) {
  const dims = SIZE_CLASSES[size];
  const imageUrl = CARD_IMAGES[card.slug];

  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl shadow-xl aspect-[1.586/1]", dims)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${card.issuer} ${card.name} credit card`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Fallback: CSS gradient with card name
  const grad = ISSUER_GRADIENTS[card.issuer] ?? "from-slate-800 to-slate-600";
  return (
    <div className={cn("relative rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl aspect-[1.586/1]", grad, dims)}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{card.issuer}</div>
      <div className="mt-2 font-display text-lg font-bold leading-tight">{card.name}</div>
      <div className="absolute bottom-4 left-5 text-xs opacity-70">{card.network}</div>
    </div>
  );
}
