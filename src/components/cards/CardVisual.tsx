import { cn } from "@/lib/cn";
import type { Card } from "@/lib/cards/types";

// Static map of slug -> public image path.
// Add entries here as new card images are added to public/images/cards/.
const CARD_IMAGES: Record<string, string> = {
  // Pre-existing
  "citi-double-cash": "/images/cards/citi-double-cash.webp",
  "chase-sapphire-preferred": "/images/cards/chase-sapphire-preferred.png",
  "discover-it-secured": "/images/cards/discover-it-secured.png",
  "chase-ink-business-cash": "/images/cards/chase-ink-business-cash.png",
  "discover-it-student-cash": "/images/cards/discover-it-student-cash.png",
  // Alaska Airlines
  "alaska-airlines-visa": "/images/cards/alaska-airlines-visa.jpg",
  // American Express
  "amex-business-gold": "/images/cards/amex-business-gold.png",
  "amex-gold": "/images/cards/amex-gold.png",
  "amex-platinum": "/images/cards/amex-platinum.png",
  "delta-gold-amex": "/images/cards/delta-gold-amex.png",
  "hilton-honors-amex": "/images/cards/hilton-honors-amex.png",
  // Apple / Goldman Sachs
  "apple-card": "/images/cards/apple-card.png",
  // Bank of America
  "bank-of-america-customized-cash": "/images/cards/bank-of-america-customized-cash.png",
  // Bilt
  "bilt-mastercard": "/images/cards/bilt-mastercard.png",
  // Capital One
  "capital-one-platinum-secured": "/images/cards/capital-one-platinum-secured.png",
  "capital-one-quicksilver": "/images/cards/capital-one-quicksilver.png",
  "capital-one-quicksilver-student": "/images/cards/capital-one-quicksilver-student.png",
  "capital-one-spark-cash-business": "/images/cards/capital-one-spark-cash-business.png",
  "capital-one-venture": "/images/cards/capital-one-venture.png",
  // Chase
  "chase-freedom-flex": "/images/cards/chase-freedom-flex.png",
  "chase-freedom-unlimited": "/images/cards/chase-freedom-unlimited.png",
  "chase-ink-business-preferred": "/images/cards/chase-ink-business-preferred.png",
  "chase-sapphire-reserve": "/images/cards/chase-sapphire-reserve.png",
  "ihg-one-rewards-premier": "/images/cards/ihg-one-rewards-premier.png",
  "marriott-bonvoy-boundless": "/images/cards/marriott-bonvoy-boundless.png",
  "southwest-rapid-rewards-priority": "/images/cards/southwest-rapid-rewards-priority.png",
  "united-explorer": "/images/cards/united-explorer.png",
  "world-of-hyatt": "/images/cards/world-of-hyatt.png",
  // Discover
  "discover-it-cashback": "/images/cards/discover-it-cashback.webp",
  "discover-it-student-chrome": "/images/cards/discover-it-student-chrome.png",
  // Petal / WebBank
  "petal-2": "/images/cards/petal-2.svg",
  // Self Financial
  "self-visa-credit-card": "/images/cards/self-visa-credit-card.svg",
  // Wells Fargo
  "wells-fargo-active-cash": "/images/cards/wells-fargo-active-cash.webp",
};

const ISSUER_GRADIENTS: Record<string, string> = {
  Chase: "from-blue-900 to-blue-700",
  Citi: "from-slate-900 to-slate-700",
  Discover: "from-orange-600 to-orange-400",
  "American Express": "from-emerald-700 to-emerald-500",
  "Capital One": "from-rose-800 to-rose-600",
  "Wells Fargo": "from-red-800 to-red-600",
  "Bank of America": "from-red-900 to-red-700",
  "Goldman Sachs": "from-zinc-900 to-zinc-700",
  Barclays: "from-blue-800 to-blue-600",
  "Capital Bank": "from-sky-700 to-sky-500",
  "Self Financial": "from-teal-700 to-teal-500",
  WebBank: "from-purple-700 to-purple-500",
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
