import fs from "fs";
import path from "path";
import { AutoInsuranceSchema, type AutoInsurance } from "./types";

const AUTO_INSURANCE_DIR = path.join(process.cwd(), "data/insurance/auto-insurance");

let _cache: AutoInsurance[] | null = null;

export function loadAllAutoInsurance(): AutoInsurance[] {
  if (_cache) return _cache;
  if (!fs.existsSync(AUTO_INSURANCE_DIR)) return [];
  const files = fs.readdirSync(AUTO_INSURANCE_DIR).filter((f) => f.endsWith(".json"));
  _cache = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(AUTO_INSURANCE_DIR, f), "utf8"));
    return AutoInsuranceSchema.parse(raw);
  });
  return _cache;
}

export function loadAutoInsuranceBySlug(slug: string): AutoInsurance | null {
  return loadAllAutoInsurance().find((c) => c.slug === slug) ?? null;
}
