import { Star } from "lucide-react";

export function StarRating({ rating, label }: { rating: number; label?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-4 w-4 ${n <= Math.round(rating) ? "fill-amber-500 text-amber-500" : "fill-slate-200 text-slate-200"}`}
          />
        ))}
      </div>
      <span className="font-num text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
      {label && <span className="text-xs text-slate-500">{label}</span>}
    </div>
  );
}
