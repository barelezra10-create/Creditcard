import fs from "fs";
import path from "path";

const HERO_DIR = path.join(process.cwd(), "public/images/heroes");

function detectHeroes(): Record<string, string> {
  if (!fs.existsSync(HERO_DIR)) return {};
  const map: Record<string, string> = {};
  for (const f of fs.readdirSync(HERO_DIR)) {
    const m = f.match(/^([a-z0-9-]+)\.(png|jpe?g|webp)$/i);
    if (m) map[m[1]] = `/images/heroes/${f}`;
  }
  return map;
}

const HEROES = detectHeroes();

export function HeroImage({
  slug,
  alt,
  className,
}: {
  slug: string;
  alt: string;
  className?: string;
}) {
  const src = HEROES[slug];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className ?? "h-72 w-full rounded-2xl object-cover md:h-96"}
    />
  );
}
