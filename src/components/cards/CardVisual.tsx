import { cn } from "@/lib/cn";
import type { Card } from "@/lib/cards/types";

const ISSUER_GRADIENTS: Record<string, string> = {
  Chase: "from-blue-900 to-blue-700",
  Citi: "from-slate-900 to-slate-700",
  Discover: "from-orange-600 to-orange-400",
  Amex: "from-emerald-700 to-emerald-500",
  "Capital One": "from-rose-800 to-rose-600",
};

export function CardVisual({ card, size = "md" }: { card: Card; size?: "sm" | "md" | "lg" }) {
  const grad = ISSUER_GRADIENTS[card.issuer] ?? "from-slate-800 to-slate-600";
  const dims = { sm: "h-28 w-44", md: "h-44 w-72", lg: "h-56 w-96" }[size];
  return (
    <div className={cn("relative rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl", grad, dims)}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{card.issuer}</div>
      <div className="mt-2 font-display text-lg font-bold leading-tight">{card.name}</div>
      <div className="absolute bottom-4 left-5 text-xs opacity-70">{card.network}</div>
    </div>
  );
}
