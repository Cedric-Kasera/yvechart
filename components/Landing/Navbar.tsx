"use client";

import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleHashLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (pathname !== "/") {
      e.preventDefault();
      router.push(`/${hash}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/yvechart.svg"
            alt="YveChart Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            href="#features"
            onClick={(e) => handleHashLink(e, "#features")}
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={(e) => handleHashLink(e, "#how-it-works")}
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#pricing"
            onClick={(e) => handleHashLink(e, "#pricing")}
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/c/community"
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            Community
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-bg-surface px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-base font-medium text-gray-600 hover:text-primary-600"
              onClick={(e) => {
                handleHashLink(e, "#features");
                setIsMenuOpen(false);
              }}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-medium text-gray-600 hover:text-primary-600"
              onClick={(e) => {
                handleHashLink(e, "#how-it-works");
                setIsMenuOpen(false);
              }}
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-base font-medium text-gray-600 hover:text-primary-600"
              onClick={(e) => {
                handleHashLink(e, "#pricing");
                setIsMenuOpen(false);
              }}
            >
              Pricing
            </Link>
            <Link
              href="/c/community"
              className="text-base font-medium text-gray-600 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="text-base font-medium text-gray-900 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-base font-medium text-white hover:bg-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
