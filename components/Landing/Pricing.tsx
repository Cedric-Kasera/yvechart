import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for individuals getting started with architecture design.",
    cta: "Get Started",
    href: "/auth/signup?plan=free",
    highlighted: false,
    features: [
      "Unlimited workspaces",
      "Up to 10 projects per workspace",
      "Drag-and-drop canvas",
      "PNG & JSON export",
      "Community support",
      "Basic node library",
    ],
  },
  {
    name: "Pro",
    price: "$4.99",
    description: "For teams and professionals who need advanced capabilities.",
    cta: "Upgrade to Pro",
    href: "/auth/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited projects",
      "Unlimited workspaces",
      "Advanced AI features",
      "Priority support",
      "Team collaboration",
      "Custom exports (SVG, PDF)",
      "Version history",
      "Custom node templates",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.45]" />
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[24px_24px] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Start for free. Upgrade when you&apos;re ready to unlock powerful
            features for your team.
          </p>
        </div>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-8 ring-1 transition-shadow ${
                tier.highlighted
                  ? "bg-white ring-2 ring-primary-500 shadow-xl shadow-primary-500/10"
                  : "bg-white ring-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-4 py-1 text-xs font-semibold text-white shadow-sm">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold ${
                    tier.highlighted ? "text-primary-600" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">/month</span>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        tier.highlighted ? "text-primary-500" : "text-green-500"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                  tier.highlighted
                    ? "bg-primary-500 text-white hover:bg-primary-600 shadow-sm"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
