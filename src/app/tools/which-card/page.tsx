import { loadAllCards } from "@/lib/cards/loader";
import QuizClient from "./QuizClient";

export const metadata = { title: "Which Card Should I Get?" };

export default function Page() {
  return <QuizClient cards={loadAllCards()} />;
}
