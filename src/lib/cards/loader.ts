import fs from "fs";
import path from "path";
import { CardSchema, type Card } from "./types";

const CARDS_DIR = path.join(process.cwd(), "data/cards");

let _cache: Card[] | null = null;

export function loadAllCards(): Card[] {
  if (_cache) return _cache;
  const files = fs.readdirSync(CARDS_DIR).filter((f) => f.endsWith(".json"));
  const cards = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(CARDS_DIR, f), "utf8"));
    return CardSchema.parse(raw);
  });
  _cache = cards;
  return cards;
}

export function loadCardBySlug(slug: string): Card | null {
  return loadAllCards().find((c) => c.slug === slug) ?? null;
}

export function loadCardsByCategory(category: string): Card[] {
  return loadAllCards().filter((c) => c.category.includes(category as any));
}
