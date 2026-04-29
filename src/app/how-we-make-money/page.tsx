export const metadata = {
  title: "How We Make Money | The Credit Card Pick",
  description:
    "Full disclosure: The Credit Card Pick earns affiliate commissions on some card applications. Learn exactly how that works and why it doesn't affect our rankings.",
};

export default function HowWeMakeMoneyPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>How We Make Money</h1>

      <p>
        The Credit Card Pick is an independent editorial site. We cover our
        operating costs primarily through affiliate commissions. Here is exactly
        how that works.
      </p>

      <h2>Affiliate Links</h2>
      <p>
        Some credit card application links on this site are affiliate links. When
        you click one of those links, land on the issuer's website, apply for a
        card, and get approved, the issuer pays us a commission. That commission is
        paid by the issuer, not by you. It does not change the card's terms, the
        annual fee, your APR, or your approval odds in any way.
      </p>
      <p>
        Affiliate-linked cards have an "Apply" button that routes through
        <code>/go/[card-slug]</code> before redirecting to the issuer's site. That
        redirect is how we track whether our referral led to an application. The
        issuer's own tracking takes over from there.
      </p>

      <h2>Our Editorial Process Comes First</h2>
      <p>
        Our editorial team scores and ranks cards using the criteria described in
        our{" "}
        <a href="/methodology">methodology</a> before checking which cards have
        active affiliate offers. The ranking determines the list; affiliate
        availability does not.
      </p>
      <p>
        Because of this, you will sometimes see cards we recommend that have no
        affiliate link at all. We still recommend them. When that's the case, the
        apply button links directly to the issuer's site and we earn nothing from
        your application. We note this on the card's page when relevant.
      </p>

      <h2>What We Don't Do</h2>
      <p>
        We do not accept payment from card issuers to feature, promote, or
        positively write about specific cards. We do not run "sponsored" card
        reviews. We do not accept free products or perks from issuers in exchange
        for coverage.
      </p>
      <p>
        A card issuer cannot buy a higher ranking on this site.
      </p>

      <h2>FTC Disclosure</h2>
      <p>
        Per Federal Trade Commission guidelines, we disclose material connections
        between this site and the products we review. When we earn a commission on
        a card application, that is a material connection and we say so. You will
        see disclosure language on any page that contains affiliate links.
      </p>

      <h2>Other Revenue</h2>
      <p>
        At launch, affiliate commissions are our only revenue source. If we ever
        add other forms of revenue (display advertising, sponsored content clearly
        labeled as such, direct partnerships), we will update this page to reflect
        that and make the disclosure visible on the relevant content.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about our business model or a specific card's
        affiliate status, email us at{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>.
      </p>
    </article>
  );
}
