"use client";
export function NumberInput({ label, value, onChange, prefix, suffix, step = 1 }: { label: string; value: number; onChange: (n: number) => void; prefix?: string; suffix?: string; step?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1 flex items-center rounded-md border border-slate-300 px-3 py-2 focus-within:border-navy-500">
        {prefix && <span className="mr-1 text-sm text-slate-500">{prefix}</span>}
        <input type="number" value={value} step={step} onChange={(e) => onChange(parseFloat(e.target.value || "0"))} className="w-full bg-transparent font-num outline-none" />
        {suffix && <span className="ml-1 text-sm text-slate-500">{suffix}</span>}
      </div>
    </label>
  );
}
