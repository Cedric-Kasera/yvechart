import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";

export default function PrivacyPage() {
  const lastUpdated = "February 7, 2026";

  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to YveChart ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. By accessing or using our platform at yvechart.com (the "Service"), you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use the Service.`,
    },
    {
      title: "2. Information We Collect",
      subsections: [
        {
          title: "2.1 Information You Provide",
          items: [
            "Account Information: Name, email address, and password when you create an account.",
            "Profile Information: Display name, avatar image, and other optional profile details.",
            "Workspace & Project Data: Names, descriptions, architecture diagrams, nodes, edges, and any configuration data you create within the Service.",
            "Communications: Any messages, feedback, bug reports, or support requests you send to us.",
            "Payment Information: Billing address and payment method details when you subscribe to a paid plan. Payment processing is handled by third-party processors; we do not store full credit card numbers.",
          ],
        },
        {
          title: "2.2 Information Collected Automatically",
          items: [
            "Usage Data: Pages visited, features used, actions taken, timestamps, and session duration.",
            "Device & Browser Information: IP address, browser type and version, operating system, device identifiers, and screen resolution.",
            "Cookies & Similar Technologies: We use cookies, local storage, and similar technologies to maintain sessions, remember preferences, and analyze usage patterns.",
            "Log Data: Server logs that record requests, errors, referring URLs, and performance metrics.",
          ],
        },
        {
          title: "2.3 Information from Third Parties",
          items: [
            "OAuth Providers: If you sign in via a third-party provider (e.g., Google, GitHub), we receive your name, email, and profile picture as authorized by you.",
            "Analytics Services: We may receive aggregated or anonymized data from analytics providers to understand usage trends.",
          ],
        },
      ],
    },
    {
      title: "3. How We Use Your Information",
      items: [
        "Provide, operate, and maintain the Service, including rendering your architecture diagrams and managing workspaces.",
        "Create and manage your account, authenticate sessions, and process transactions.",
        "Communicate with you, including sending service-related notices, security alerts, and support responses.",
        "Improve and personalize the Service by analyzing usage patterns, diagnosing technical issues, and developing new features.",
        "Enforce our Terms of Service and protect against unauthorized access, fraud, or abuse.",
        "Comply with legal obligations, respond to lawful requests, and protect our rights and safety.",
        "Send promotional communications (only with your consent; you may opt out at any time).",
      ],
    },
    {
      title: "4. Legal Bases for Processing (GDPR)",
      content:
        "If you are located in the European Economic Area (EEA), we process your personal data under the following legal bases:",
      items: [
        "Contractual Necessity: Processing required to provide the Service you requested.",
        "Legitimate Interests: Improving our Service, preventing fraud, and ensuring security, provided these interests are not overridden by your rights.",
        "Consent: Where you have given explicit consent, such as for marketing communications.",
        "Legal Obligation: Processing required to comply with applicable laws and regulations.",
      ],
    },
    {
      title: "5. How We Share Your Information",
      content:
        "We do not sell your personal information. We may share your data in the following circumstances:",
      items: [
        "Service Providers: Trusted third-party vendors who assist us with hosting, analytics, payment processing, email delivery, and customer support, under strict data processing agreements.",
        "Legal Requirements: When required by law, subpoena, court order, or governmental request, or when we believe disclosure is necessary to protect our rights or safety.",
        "Business Transfers: In connection with a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction.",
        "With Your Consent: We may share information for purposes you have explicitly authorized.",
        "Aggregated/Anonymized Data: We may share non-identifiable, aggregated statistics for research, marketing, or analytical purposes.",
      ],
    },
    {
      title: "6. Data Retention",
      content:
        "We retain your personal information for as long as your account is active or as needed to provide you the Service. After account deletion, we will remove or anonymize your data within 30 days, except where retention is required by law (e.g., for tax, legal, or audit purposes). Backup copies may persist for up to 90 days before being purged from our systems.",
    },
    {
      title: "7. Data Security",
      content:
        "We implement industry-standard technical and organizational security measures to protect your data, including encryption in transit (TLS/SSL), encryption at rest, secure password hashing (bcrypt), access controls, regular security audits, and monitoring. However, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security and encourage you to use strong, unique passwords and enable available security features.",
    },
    {
      title: "8. Your Rights & Choices",
      content:
        "Depending on your location, you may have the following rights regarding your personal data:",
      items: [
        "Access: Request a copy of the personal data we hold about you.",
        "Rectification: Request correction of inaccurate or incomplete data.",
        "Erasure: Request deletion of your personal data (subject to legal retention requirements).",
        "Restriction: Request that we limit processing of your data in certain circumstances.",
        "Portability: Request a machine-readable copy of your data for transfer to another service.",
        "Objection: Object to processing based on legitimate interests or for direct marketing.",
        "Withdraw Consent: Where processing is based on consent, you may withdraw it at any time without affecting prior processing.",
        "Non-Discrimination: We will not discriminate against you for exercising your privacy rights.",
      ],
      footer:
        "To exercise any of these rights, contact us at stickrhive@gmail.com. We will respond within 30 days.",
    },
    {
      title: "9. Cookies & Tracking Technologies",
      content:
        "We use cookies and similar technologies for session management, authentication, preferences, and analytics. You can control cookies through your browser settings. Disabling certain cookies may affect Service functionality. We honor Do Not Track (DNT) browser signals where technically feasible.",
    },
    {
      title: "10. International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission and compliance with applicable data transfer frameworks.",
    },
    {
      title: "11. Children's Privacy",
      content:
        "The Service is not directed to children under the age of 16. We do not knowingly collect personal information from children. If we learn that we have collected data from a child under 16, we will delete it promptly. If you believe a child has provided us with personal data, please contact us immediately.",
    },
    {
      title: "12. Third-Party Links & Services",
      content:
        "The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.",
    },
    {
      title: "13. Changes to This Policy",
      content:
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date. Continued use of the Service after changes constitutes acceptance of the revised policy. We encourage you to review this page periodically.',
    },
    {
      title: "14. Contact Us",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:",
      contact: ["Email: stickrhive@gmail.com", "Website: yvechart.com"],
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {section.content}
                  </p>
                )}

                {section.subsections &&
                  section.subsections.map((sub) => (
                    <div
                      key={sub.title}
                      className="mb-4 pl-4 border-l-2 border-gray-100"
                    >
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">
                        {sub.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {sub.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-600 leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary-500 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {section.items && (
                  <ul className="space-y-1.5">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    {section.footer}
                  </p>
                )}

                {section.contact && (
                  <div className="mt-2 space-y-1">
                    {section.contact.map((line, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
