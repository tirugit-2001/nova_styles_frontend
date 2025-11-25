import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-sm">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Terms & Conditions
          </h1>
        </header>

        <main className="prose prose-sm sm:prose md:prose-lg max-w-none text-gray-700">
          <section>
            <h2>1. Overview</h2>
            <p>
              These Terms govern your use of NovaStyles’ website and services,
              including interior design, construction, renovation, and product
              purchases. By using our website, you agree to comply with these
              Terms.
            </p>
          </section>

          <section>
            <h2>2. Services</h2>
            <p>NovaStyles offers:</p>
            <ul>
              <li>Interior design and execution</li>
              <li>Home construction and renovation</li>
              <li>Custom and ready-made home products</li>
            </ul>
            <p>
              Project timelines, deliverables, and pricing are finalized only
              after client consultation and written agreement.
            </p>
          </section>

          <section>
            <h2>3. Quotations &amp; Estimates</h2>
            <p>
              All online cost estimates are indicative. Final pricing will
              depend on site inspection, material selection, and project scope.
            </p>
          </section>

          <section>
            <h2>4. Payments</h2>
            <p>
              Payments must be made as per the agreed milestones or purchase
              terms. Late or incomplete payments may result in project delays or
              suspension of work.
            </p>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              All designs, layouts, visuals, and website content belong to
              NovaStyles. Unauthorized use, copying, or distribution is
              prohibited.
            </p>
          </section>

          <section>
            <h2>6. User Responsibilities</h2>
            <p>Users agree not to:</p>
            <ul>
              <li>Provide false or misleading information.</li>
              <li>Misuse or interfere with the website’s functionality.</li>
              <li>Copy or distribute any content without written consent.</li>
            </ul>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              NovaStyles is not liable for indirect, incidental, or
              consequential damages, or delays caused by third parties,
              regulatory approvals, or supply chain issues.
            </p>
          </section>

          <section>
            <h2>8. Warranty</h2>
            <p>
              Warranty coverage applies only to projects or products that
              include a specific written warranty agreement (for example, a
              5-year warranty for interiors where explicitly stated).
            </p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>
              NovaStyles may suspend or terminate user access for violating
              these Terms or misuse of services.
            </p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes will
              fall under the jurisdiction of the courts in Bangalore, Karnataka.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>
              {/* NovaStyles Pvt. Ltd. */}
              {/* <br /> */}
              Email:{" "}
              <a
                href="mailto:salesnovastyles@gmail.com"
                className="text-indigo-600"
              >
                salesnovastyles@gmail.com
              </a>
              <br />
              Phone: [Insert Number]
              <br />
              Website:{" "}
              <a
                href="https://www.novastylesinterior.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600"
              >
                www.novastylesinterior.com
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
