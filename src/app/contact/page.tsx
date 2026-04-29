export const metadata = {
  title: "Contact Us | The Credit Card Pick",
  description:
    "Reach the editorial team at The Credit Card Pick for factual corrections, tips, and press inquiries.",
};

export default function ContactPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>Contact Us</h1>

      <p>
        We are a small editorial team. Here is how to reach the right inbox.
      </p>

      <h2>Editorial and Corrections</h2>
      <p>
        Email{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>{" "}
        for tips, factual corrections, or to flag card terms that have changed
        since we last reviewed them. We take corrections seriously and respond
        within 48 hours on business days.
      </p>

      <h2>Press</h2>
      <p>
        Media and press inquiries go to{" "}
        <a href="mailto:press@thecreditcardpick.com">press@thecreditcardpick.com</a>.
      </p>

      <h2>What We Can't Help With</h2>
      <p>
        We do not provide personalized financial advice via email. Please do not
        send us details of your financial situation and ask us which card you
        should apply for. For personalized guidance, consult a licensed financial
        advisor or a nonprofit credit counselor such as those certified by the
        NFCC (nfcc.org).
      </p>
      <p>
        For disputes about your existing credit card account, billing errors, or
        fraud claims, contact your card issuer directly. For example, Chase
        customer service can be reached at 1-800-432-3117. The number for your
        issuer is printed on the back of your card.
      </p>
      <p>
        For complaints about a card issuer's practices, you can file a complaint
        with the Consumer Financial Protection Bureau at consumerfinance.gov/complaint.
      </p>
    </article>
  );
}
