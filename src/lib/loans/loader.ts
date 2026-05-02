import fs from "fs";
import path from "path";
import { StudentLoanSchema, type StudentLoan } from "./types";

const STUDENT_LOANS_DIR = path.join(process.cwd(), "data/loans/student-loans");

let _cache: StudentLoan[] | null = null;

export function loadAllStudentLoans(): StudentLoan[] {
  if (_cache) return _cache;
  if (!fs.existsSync(STUDENT_LOANS_DIR)) return [];
  const files = fs.readdirSync(STUDENT_LOANS_DIR).filter((f) => f.endsWith(".json"));
  _cache = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(STUDENT_LOANS_DIR, f), "utf8"));
    return StudentLoanSchema.parse(raw);
  });
  return _cache;
}

export function loadStudentLoanBySlug(slug: string): StudentLoan | null {
  return loadAllStudentLoans().find((l) => l.slug === slug) ?? null;
}
