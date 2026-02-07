import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CTA() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.45]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to visualize your architecture?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of developers and architects who use YveChart to
            design, debate, and document their systems.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/signup"
              className="rounded-lg bg-primary-500 px-6 py-3 text-sm text-white shadow-sm hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors flex items-center gap-2"
            >
              Get started for free <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="text-sm leading-6 text-white hover:text-gray-200 flex items-center gap-2"
            >
              Check pricing <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Background decoration */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#F15757" />
                <stop offset="1" stopColor="#6E2020" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
