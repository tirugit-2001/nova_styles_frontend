import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-sm">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Effective Date: [Insert Date]
          </p>
        </header>

        <main className="prose prose-sm sm:prose md:prose-lg max-w-none text-gray-700">
          <section>
            <h2>Introduction</h2>
            <p>
              We respect your privacy. This policy explains what personal
              information we collect, how we use it, and the choices you have
              regarding your information.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <ul>
              <li>Contact details (name, email, phone) when you reach out.</li>
              <li>Project information provided during consultations.</li>
              <li>Usage data collected automatically (cookies, analytics).</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Deliver services and communicate about your project.</li>
              <li>Process payments and manage orders.</li>
              <li>Improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2>Cookies &amp; Tracking</h2>
            <p>
              We use cookies and similar technologies to operate the site and
              provide analytics. You can control cookies through your browser
              settings.
            </p>
          </section>

          <section>
            <h2>Sharing &amp; Disclosure</h2>
            <p>
              We do not sell personal data. We may share information with
              service providers who support our operations, under contracts
              requiring them to protect your data.
            </p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We take reasonable steps to protect information but cannot
              guarantee absolute security. Notify us if you suspect a breach.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information. Contact us at the address below to make a
              request.
            </p>
          </section>

          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy; material changes will be posted with an
              updated effective date.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:support@novastyles.in"
                className="text-indigo-600"
              >
                salesnovastyles@gmail.com
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
