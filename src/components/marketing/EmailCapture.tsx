"use client";
import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", "newsletter_signup", { email });
    setStatus("submitted");
  }

  if (status === "submitted") {
    return <div className="rounded-lg bg-green-50 p-6 text-center text-sm text-green-800">Thanks! We'll let you know when better cards launch in your category.</div>;
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <div className="font-display text-lg font-semibold text-navy-900">Get notified about better cards</div>
      <p className="mt-1 text-sm text-slate-600">When a new card beats one of our top picks, we'll email you. No spam.</p>
      <div className="mt-4 flex gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Subscribe</button>
      </div>
    </form>
  );
}
