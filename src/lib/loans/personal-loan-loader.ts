import fs from "fs";
import path from "path";
import { PersonalLoanSchema, type PersonalLoan } from "./personal-loan-types";

const PERSONAL_LOANS_DIR = path.join(process.cwd(), "data/loans/personal-loans");

let _cache: PersonalLoan[] | null = null;

export function loadAllPersonalLoans(): PersonalLoan[] {
  if (_cache) return _cache;
  if (!fs.existsSync(PERSONAL_LOANS_DIR)) return [];
  const files = fs.readdirSync(PERSONAL_LOANS_DIR).filter((f) => f.endsWith(".json"));
  _cache = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(PERSONAL_LOANS_DIR, f), "utf8"));
    return PersonalLoanSchema.parse(raw);
  });
  return _cache;
}

export function loadPersonalLoanBySlug(slug: string): PersonalLoan | null {
  return loadAllPersonalLoans().find((l) => l.slug === slug) ?? null;
}
