export const metadata = {
  title: "How We Rank Credit Cards | The Credit Card Pick",
  description:
    "Our transparent, five-criteria scoring system for ranking credit cards. Learn exactly how we evaluate rewards, fees, APR, accessibility, and real-world utility.",
};

export default function MethodologyPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>How We Rank Credit Cards</h1>

      <p>
        Every ranking on The Credit Card Pick is produced by the same five-criteria
        framework. We score each card from 1 to 10 on each criterion, apply the
        weights below, and publish the result. No card pays to be ranked higher.
      </p>

      <h2>Our Five Criteria</h2>

      <h3>1. Rewards Rate at Typical Spend (Weight: 30%)</h3>
      <p>
        We model a typical household spending $2,000 per month across groceries,
        dining, gas, and general purchases. We calculate the effective cash-back or
        point value earned on that exact mix, including any caps or tiered rates.
        Cards that reward how real people actually spend score higher than cards
        with flashy headline rates locked behind narrow categories.
      </p>

      <h3>2. Total Cost of Ownership (Weight: 25%)</h3>
      <p>
        Annual fees and APR are real costs. We subtract the annual fee from the
        first-year rewards estimate and factor in a 30-day revolving balance
        scenario (using the card's go-to APR) to show true net value. A card with
        a $95 annual fee that delivers $300 in rewards beats a free card that
        delivers $180, but only if you actually use the perks. We show you both
        numbers.
      </p>

      <h3>3. Accessibility and Credit Score Requirements (Weight: 20%)</h3>
      <p>
        A card that requires a 750+ FICO score cannot help someone rebuilding
        credit. We score this criterion based on the realistic approval range
        issuers publish, the availability of pre-qualification tools, and whether
        the card reports to all three bureaus. Cards targeting rebuilders are
        scored on a separate scale appropriate for that audience.
      </p>

      <h3>4. Transparency of Terms (Weight: 15%)</h3>
      <p>
        We read the full terms. We penalize cards with confusing reward
        redemption minimum thresholds, points that expire without clear
        communication, or APR ranges so wide they're effectively meaningless.
        Issuers that publish clear, simple terms in their Schumer Box earn higher
        scores here.
      </p>

      <h3>5. Real-World Utility (Weight: 10%)</h3>
      <p>
        Does the card fit a real life? We evaluate travel benefits against how
        often average people fly, lounge access against how many airports offer it,
        and purchase protections against typical consumer purchases. Cards that
        offer benefits most cardholders will actually use score higher than cards
        padded with perks that look good on a comparison chart but go unused.
      </p>

      <h2>How Often We Update Rankings</h2>
      <p>
        We review all rankings at minimum once per quarter. We also update
        immediately whenever an issuer announces a terms change, reward structure
        revision, or fee adjustment. If you spot a change we haven't reflected yet,
        email us at{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>{" "}
        and we will review it within 48 business hours.
      </p>

      <h2>What We Don't Do</h2>
      <p>
        We do not rank cards by affiliate payout. In fact, some cards we rate
        highly are not in any affiliate network we participate in. We recommend
        them anyway, and we note when that's the case. Our editorial team finalizes
        rankings before checking which cards have active affiliate offers.
      </p>

      <h2>Disclaimer</h2>
      <p>
        We are not financial advisors. Nothing on this site is personalized
        financial advice. Our rankings are informational tools to help you compare
        options; your final decision should be based on your own financial
        situation. If you need individualized guidance, consult a licensed financial
        advisor or credit counselor.
      </p>
    </article>
  );
}
