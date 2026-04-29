export const metadata = {
  title: "Privacy Policy | The Credit Card Pick",
  description:
    "The Credit Card Pick privacy policy: what data we collect, how we use it, and how to exercise your rights under CCPA and GDPR.",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-500">Last updated: April 28, 2026</p>

      <p>
        This policy describes how The Credit Card Pick ("we," "our," or "us")
        collects, uses, and handles information when you visit
        thecreditcardpick.com. We have tried to write it in plain English.
      </p>

      <h2>1. What Data We Collect</h2>

      <h3>Analytics Data</h3>
      <p>
        We use Google Analytics to understand how visitors use this site. Google
        Analytics collects information such as your approximate location (country
        and region), browser type, device type, pages visited, and time spent on
        pages. This data is aggregated and anonymized from our perspective. We
        cannot identify you personally from it.
      </p>
      <p>
        We may also use Cloudflare Web Analytics, which collects similar aggregate
        traffic data at the edge without using cookies.
      </p>

      <h3>Email Signups</h3>
      <p>
        If you voluntarily sign up for our email newsletter, we collect your email
        address. That address is stored in Klaviyo, our email marketing platform.
        We use it only to send you the newsletter you signed up for. We do not add
        you to any marketing list without your explicit opt-in. You can unsubscribe
        at any time using the link in any email we send you.
      </p>

      <h3>Contact Emails</h3>
      <p>
        If you email us directly at hello@thecreditcardpick.com or
        press@thecreditcardpick.com, we receive and store your email address and
        the contents of your message. We use this only to respond to you and do
        not add you to any marketing list based on it.
      </p>

      <h3>What We Don't Collect</h3>
      <p>
        We do not collect names, addresses, phone numbers, payment information, or
        any government-issued ID numbers. We do not require account creation to
        use this site.
      </p>

      <h2>2. Cookies</h2>
      <p>
        This site uses cookies in the following ways:
      </p>
      <ul>
        <li>
          <strong>Google Analytics cookies:</strong> These are set by Google to
          track visits and sessions. They are covered by Google's own privacy
          policy at policies.google.com/privacy.
        </li>
        <li>
          <strong>Issuer tracking cookies:</strong> When you click an affiliate
          link through our <code>/go/[card-slug]</code> redirect, you are sent to
          the card issuer's website. That issuer may set their own tracking
          cookies. Those cookies are governed by the issuer's privacy policy, not
          ours. We cannot control, read, or delete those cookies.
        </li>
      </ul>
      <p>
        You can control cookies through your browser settings. Most browsers allow
        you to block or delete cookies. Blocking analytics cookies will not affect
        your ability to use any feature of this site.
      </p>

      <h2>3. How We Use Data</h2>
      <p>We use the data described above to:</p>
      <ul>
        <li>Understand how visitors find and use our content so we can improve it.</li>
        <li>Send newsletters to subscribers who have opted in.</li>
        <li>Respond to email inquiries and editorial corrections.</li>
      </ul>
      <p>
        We do not use your data for advertising targeting, behavioral profiling,
        or any purpose other than the ones listed above.
      </p>

      <h2>4. Data Sharing and Sale</h2>
      <p>
        We do not sell your data to any third party. We do not share your data
        with any third party except:
      </p>
      <ul>
        <li>
          <strong>Klaviyo:</strong> Email addresses from newsletter signups are
          stored and processed by Klaviyo as our email service provider.
        </li>
        <li>
          <strong>Google:</strong> Analytics data flows through Google Analytics.
        </li>
        <li>
          <strong>Legal requirements:</strong> If we are required by law to disclose
          information (for example, in response to a valid subpoena), we will do so
          and will notify you if legally permitted.
        </li>
      </ul>

      <h2>5. Affiliate Links and Third-Party Sites</h2>
      <p>
        This site contains links to third-party websites (card issuers, CFPB, etc.).
        Once you leave our site, this privacy policy no longer applies. We encourage
        you to read the privacy policy of any site you visit.
      </p>
      <p>
        Specifically: when you click an affiliate link and land on an issuer's
        application page, the issuer will collect the information you enter into
        their application. That data is theirs, not ours, and is governed by their
        privacy policy.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on where you live, you may have rights regarding your personal
        data under laws such as the California Consumer Privacy Act (CCPA) or the
        General Data Protection Regulation (GDPR). These rights may include:
      </p>
      <ul>
        <li>The right to know what data we hold about you.</li>
        <li>The right to request deletion of your data.</li>
        <li>The right to opt out of the sale of your data (we don't sell it, but you have the right regardless).</li>
        <li>The right to correct inaccurate data.</li>
        <li>The right to data portability.</li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>{" "}
        with the subject line "Privacy Request." We will respond within 30 days.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        Newsletter email addresses are retained until you unsubscribe. Contact
        emails are retained for up to two years. Analytics data is retained
        according to Google Analytics' default retention settings (14 months for
        user-level data).
      </p>

      <h2>8. Children</h2>
      <p>
        This site is not directed at children under 13. We do not knowingly collect
        personal information from children under 13. If you believe we have
        inadvertently collected such information, contact us and we will delete it.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy when our practices change. When we do, we will
        update the "Last updated" date at the top of this page. Material changes
        will be noted more prominently.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy-related questions or requests, email{" "}
        <a href="mailto:hello@thecreditcardpick.com">hello@thecreditcardpick.com</a>.
      </p>
    </article>
  );
}
