"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/cards", label: "Cards" },
  { href: "/loans", label: "Loans" },
  { href: "/insurance", label: "Insurance" },
  { href: "/banking", label: "Banking" },
  { href: "/investing", label: "Investing" },
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
];

const EXTRA_LINKS = [
  { href: "/glossary", label: "Glossary" },
  { href: "/methodology", label: "Methodology" },
  { href: "/how-we-make-money", label: "How We Make Money" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold text-navy-900" onClick={() => setOpen(false)}>
          {SITE.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-navy-900">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile slide-down panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav className="absolute left-0 right-0 z-50 border-b border-slate-100 bg-white px-6 pb-6 pt-2 shadow-lg md:hidden">
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-navy-900"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <ul className="space-y-1">
                {EXTRA_LINKS.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="block rounded-md px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-navy-900"
                      onClick={() => setOpen(false)}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
