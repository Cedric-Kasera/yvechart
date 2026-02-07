import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <Link
            href="/"
            className="mb-6 inline-block hover:opacity-80 transition-opacity"
          >
            <Image
              src="/yvechart.svg"
              alt="YveChart Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav
            className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            <div className="pb-6">
              <Link
                href="#"
                className="text-sm leading-6 text-gray-600 hover:text-primary-600"
              >
                About
              </Link>
            </div>
            <div className="pb-6">
              <Link
                href="#"
                className="text-sm leading-6 text-gray-600 hover:text-primary-600"
              >
                Features
              </Link>
            </div>
            <div className="pb-6">
              <Link
                href="#"
                className="text-sm leading-6 text-gray-600 hover:text-primary-600"
              >
                Pricing
              </Link>
            </div>
            <div className="pb-6">
              <Link
                href="#"
                className="text-sm leading-6 text-gray-600 hover:text-primary-600"
              >
                Privacy
              </Link>
            </div>
            <div className="pb-6">
              <Link
                href="#"
                className="text-sm leading-6 text-gray-600 hover:text-primary-600"
              >
                Terms
              </Link>
            </div>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} YveChart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
