import Link from "next/link";
import {
  ArrowRightIcon,
  QueueListIcon,
  BoltIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-main pt-16 pb-24">
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

        {/* Abstract graphical representation */}
        <div className="mt-16 flow-root sm:mt-24 relative">
          <div className="m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 aspect-video flex items-center justify-center overflow-hidden bg-dot-pattern">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              {/* Mock UI Elements */}
              <div className="relative grid grid-cols-3 gap-8 p-12 w-full max-w-4xl">
                {/* Card 1 */}
                <div className="flex flex-col gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm items-center z-10">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <QueueListIcon className="h-5 w-5" />
                  </div>
                  <div className="h-2 w-20 bg-gray-200 rounded"></div>
                  <div className="h-2 w-16 bg-gray-100 rounded"></div>
                </div>

                {/* Connection Lines (Simulated) */}
                <div className="absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gray-300 z-0"></div>

                {/* Card 2 (Center) */}
                <div className="flex flex-col gap-3 p-4 rounded-lg bg-white border-2 border-primary-500 shadow-md items-center transform scale-110 z-20">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <BoltIcon className="h-6 w-6" />
                  </div>
                  <div className="h-3 w-24 bg-gray-800 rounded"></div>
                  <div className="h-2 w-20 bg-gray-200 rounded"></div>
                </div>

                {/* Connection Lines (Simulated) */}
                <div className="absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gray-300 z-0"></div>

                {/* Card 3 */}
                <div className="flex flex-col gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm items-center z-10">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ShareIcon className="h-5 w-5" />
                  </div>
                  <div className="h-2 w-20 bg-gray-200 rounded"></div>
                  <div className="h-2 w-16 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
