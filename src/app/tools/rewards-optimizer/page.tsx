import { loadAllCards } from "@/lib/cards/loader";
import RewardsToolClient from "./RewardsToolClient";

export const metadata = { title: "Rewards Optimizer" };

export default function Page() {
  return <RewardsToolClient cards={loadAllCards()} />;
}
