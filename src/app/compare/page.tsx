import { Suspense } from "react";
import { loadAllCards } from "@/lib/cards/loader";
import CompareClient from "./CompareClient";

export const metadata = { title: "Compare Credit Cards" };

export default function Page() {
  return <Suspense><CompareClient allCards={loadAllCards()} /></Suspense>;
}
