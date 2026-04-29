export const metadata = {
  title: "About The Credit Card Pick",
  description:
    "The Credit Card Pick was founded to help people find the credit card that actually fits their life, not the one that pays us the most.",
};

export default function AboutPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>About The Credit Card Pick</h1>

      <p>
        Most credit card comparison sites recommend the card that earns them the
        highest commission. We built The Credit Card Pick to do the opposite: find
        the card that actually fits your life.
      </p>

      <h2>Our Mission</h2>
      <p>
        Help people find the credit card that matches how they actually spend and
        live, based on real math and transparent methodology, not affiliate
        revenue optimization. We score cards on rewards rate, total cost, credit
        accessibility, terms clarity, and practical utility. The rankings follow
        the scores. That's it.
      </p>

      <h2>Who We're For</h2>
      <p>
        We write for four distinct audiences, and we try not to lump them together:
      </p>
      <ul>
        <li>
          <strong>Small business owners</strong> who need cards that match
          irregular cash flow, high monthly spend, and real business expense
          categories.
        </li>
        <li>
          <strong>Credit rebuilders</strong> who have had past financial
          difficulties and need honest information about secured cards, credit
          builder products, and realistic approval odds.
        </li>
        <li>
          <strong>Newcomers and students</strong> who are establishing credit for
          the first time and need to understand how credit works before choosing a
          card.
        </li>
        <li>
          <strong>Rewards and travel optimizers</strong> who want to get the most
          value from every dollar spent and are willing to manage a card portfolio
          strategically.
        </li>
      </ul>
      <p>
        A card that earns five stars for a rewards optimizer might not belong in a
        rebuilder's wallet. We score cards in context.
      </p>

      <h2>Our Editorial Principles</h2>
      <p>
        We read the Schumer Box, not just the marketing page. When a card's terms
        have a catch, we say so. When we can't verify something from primary
        sources, we say that too. We cite the CFPB, Federal Reserve consumer data,
        and issuer-published terms. We update our content when terms change, not
        just when it's convenient.
      </p>
      <p>
        We don't run upsell games. Our tools help you compare cards honestly; they
        don't push you toward the most profitable click.
      </p>

      <h2>Who We Are</h2>
      <p>
        The Credit Card Pick was founded in April 2026 by a small team with
        backgrounds in small business finance and consumer debt. Some of us have
        navigated business debt personally. That experience shapes how we write
        about credit: not as a product to sell, but as a tool that can genuinely
        help or genuinely hurt, depending on how well you understand what you're
        getting into.
      </p>
      <p>
        Where we don't have direct personal experience, we rely on primary sources:
        CFPB reports, Federal Reserve survey data, and issuer-published terms. We
        don't speculate.
      </p>

      <h2>Get in Touch</h2>
      <p>
        For editorial questions, factual corrections, or to flag a terms change we
        haven't caught yet, email us at{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>.
        We respond to corrections within 48 business hours.
      </p>
    </article>
  );
}
