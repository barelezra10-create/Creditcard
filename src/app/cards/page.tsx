import { loadAllCards } from "@/lib/cards/loader";
import CardsClient from "./CardsClient";

export const metadata = {
  title: "All Card Reviews",
  description: "Browse every credit card we've reviewed.",
};

export default function CardsIndex() {
  return <CardsClient allCards={loadAllCards()} />;
}
