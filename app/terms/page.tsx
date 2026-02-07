import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";

export default function TermsPage() {
  const lastUpdated = "February 7, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using YveChart ("we," "our," or "us") at yvechart.com (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service. We reserve the right to modify these Terms at any time. Continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.`,
    },
    {
      title: "2. Eligibility",
      content:
        "You must be at least 16 years of age to use the Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
    },
    {
      title: "3. Account Registration & Security",
      items: [
        "You must provide accurate, current, and complete information during registration and keep your account information up to date.",
        "You are responsible for maintaining the confidentiality of your account credentials, including your password.",
        "You are responsible for all activities that occur under your account, whether or not authorized by you.",
        "You must notify us immediately at stickrhive@gmail.com if you become aware of any unauthorized use of your account.",
        "We reserve the right to suspend or terminate accounts that violate these Terms or are inactive for an extended period.",
      ],
    },
    {
      title: "4. Use of the Service",
      subsections: [
        {
          title: "4.1 Permitted Use",
          content:
            "You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for its intended purpose: designing, managing, and exporting system architecture diagrams within workspaces and projects.",
        },
        {
          title: "4.2 Prohibited Conduct",
          items: [
            "Use the Service for any unlawful purpose or in violation of any applicable law or regulation.",
            "Attempt to gain unauthorized access to the Service, other user accounts, or our systems and networks.",
            "Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service.",
            "Scrape, crawl, or use automated means to access or collect data from the Service without our written consent.",
            "Upload, transmit, or distribute any viruses, malware, or other harmful code.",
            "Interfere with or disrupt the integrity or performance of the Service or its infrastructure.",
            "Use the Service to send spam, unsolicited communications, or fraudulent content.",
            "Impersonate any person or entity or misrepresent your affiliation with any person or entity.",
            "Circumvent, disable, or interfere with any security features of the Service.",
            "Resell, sublicense, or commercially exploit the Service without our prior written consent.",
          ],
        },
      ],
    },
    {
      title: "5. User Content & Data",
      subsections: [
        {
          title: "5.1 Ownership",
          content:
            'You retain all ownership rights to the content you create, upload, or store on the Service, including architecture diagrams, project data, workspace configurations, and any associated files ("User Content"). We do not claim ownership of your User Content.',
        },
        {
          title: "5.2 License Grant",
          content:
            "By using the Service, you grant us a limited, worldwide, non-exclusive, royalty-free license to host, store, process, and display your User Content solely for the purpose of operating and providing the Service to you. This license terminates when you delete your User Content or account.",
        },
        {
          title: "5.3 Responsibility",
          content:
            "You are solely responsible for the User Content you create or share through the Service. You represent that you have all necessary rights to your User Content and that it does not infringe upon the rights of any third party.",
        },
        {
          title: "5.4 Data Handling",
          content:
            "Our handling of your data is governed by our Privacy Policy. By using the Service, you consent to the collection, use, and processing of your data as described in the Privacy Policy.",
        },
      ],
    },
    {
      title: "6. Intellectual Property",
      content:
        "The Service, including its design, code, logos, trademarks, documentation, and all related intellectual property, is owned by YveChart and protected by applicable intellectual property laws. Nothing in these Terms grants you any right, title, or interest in our intellectual property, except for the limited license to use the Service as described herein.",
    },
    {
      title: "7. Subscription Plans & Payment",
      subsections: [
        {
          title: "7.1 Free & Paid Plans",
          content:
            "The Service offers both free and paid subscription plans. Paid plans provide additional features, higher limits, and priority support. Plan details and pricing are available on our website and may be updated from time to time.",
        },
        {
          title: "7.2 Billing",
          items: [
            "Paid subscriptions are billed in advance on a monthly or annual basis, depending on the plan you select.",
            "All fees are non-refundable except as required by law or as expressly stated in these Terms.",
            "You authorize us to charge your designated payment method for all applicable fees.",
            "Failure to pay may result in suspension or termination of your access to paid features.",
          ],
        },
        {
          title: "7.3 Cancellation",
          content:
            "You may cancel your paid subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until the end of that period. No partial refunds are provided for unused portions of a billing cycle.",
        },
      ],
    },
    {
      title: "8. Service Availability & Modifications",
      items: [
        "We strive to maintain the Service's availability but do not guarantee uninterrupted or error-free operation.",
        "We may modify, update, or discontinue any feature or aspect of the Service at any time, with or without notice.",
        "We may perform scheduled and unscheduled maintenance that may temporarily affect Service availability.",
        "We are not liable for any loss or damage resulting from Service downtime, modifications, or discontinuation.",
      ],
    },
    {
      title: "9. Third-Party Services",
      content:
        "The Service may integrate with or contain links to third-party services, websites, or tools. These third-party services are governed by their own terms and privacy policies. We are not responsible for the content, functionality, or practices of any third-party service. Use of third-party services is at your own risk.",
    },
    {
      title: "10. Termination",
      subsections: [
        {
          title: "10.1 By You",
          content:
            "You may terminate your account at any time by deleting your workspace through the Account settings. Upon termination, your data will be handled in accordance with our Privacy Policy.",
        },
        {
          title: "10.2 By Us",
          content:
            "We reserve the right to suspend or terminate your account and access to the Service, without prior notice, for conduct that we determine violates these Terms, is harmful to other users, or is otherwise objectionable. We may also terminate accounts for prolonged inactivity.",
        },
        {
          title: "10.3 Effect of Termination",
          content:
            "Upon termination, your right to use the Service ceases immediately. We may delete your User Content and account data within 30 days of termination, except where retention is required by law. Sections of these Terms that by their nature should survive termination will remain in effect.",
        },
      ],
    },
    {
      title: "11. Disclaimers",
      content:
        'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.',
    },
    {
      title: "12. Limitation of Liability",
      content:
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, YVECHART AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.",
    },
    {
      title: "13. Indemnification",
      content:
        "You agree to indemnify, defend, and hold harmless YveChart and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Service; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any rights of a third party.",
    },
    {
      title: "14. Governing Law & Dispute Resolution",
      items: [
        "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which YveChart operates, without regard to conflict of law principles.",
        "Any disputes arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation.",
        "If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules, except where prohibited by law.",
        "You agree to waive any right to participate in a class action lawsuit or class-wide arbitration against us.",
        "Notwithstanding the above, either party may seek injunctive or equitable relief in any court of competent jurisdiction.",
      ],
    },
    {
      title: "15. Severability",
      content:
        "If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.",
    },
    {
      title: "16. Entire Agreement",
      content:
        "These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and YveChart regarding the Service. These Terms supersede all prior agreements, communications, and understandings, whether oral or written, relating to the subject matter hereof.",
    },
    {
      title: "17. Contact Us",
      content:
        "If you have any questions or concerns about these Terms, please contact us at:",
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
              Terms of Service
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
                      {sub.content && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {sub.content}
                        </p>
                      )}
                      {sub.items && (
                        <ul className="space-y-1.5">
                          {sub.items.map((item, i) => (
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
