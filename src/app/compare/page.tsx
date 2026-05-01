import { Suspense } from "react";
import { loadAllCards } from "@/lib/cards/loader";
import CompareClient from "./CompareClient";

export const metadata = { title: "Compare Credit Cards Side by Side" };

export default function ComparePage() {
  const allCards = loadAllCards();
  return (
    <Suspense>
      <CompareClient allCards={allCards} />
    </Suspense>
  );
}
