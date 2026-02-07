"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/Landing/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-6 w-6 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-main pt-12 pb-24">
      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.45]" />
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-size-[24px_24px] opacity-40" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bg-main" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-200 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
            v1.0 is now live
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Design System Architecture
            <span className="text-primary-500"> Visually</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-10">
            Create, visualize, and document complex system architectures with
            our intuitive drag-and-drop canvas. Collaborate in real-time and
            export to clean code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-bold text-white hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
            >
              Start Designing <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Chevron Arrow Down */}
        <div>
          <ChevronDoubleDownIcon className="text-center mx-auto mt-10 h-6 w-6 text-gray-400 animate-bounce" />
        </div>

        {/* Live React Flow architecture preview */}
        <div className="mt-12 flow-root relative">
          <div className="m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 aspect-video overflow-hidden">
              <HeroCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
