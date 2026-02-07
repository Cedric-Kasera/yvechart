import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Illustration / Brand Panel */}
      <div className="hidden lg:flex relative flex-col justify-between bg-gray-900 p-12 overflow-hidden">
        {/* Background Blobs/Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-150 h-150 rounded-full bg-primary-600/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] w-75 h-75 rounded-full bg-primary-500/5 blur-[80px]" />
        </div>

        {/* Top Left Logo */}
        <div className="relative z-10 animate-fade-in">
          <Link
            href="/"
            className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
              <Image
                src="/yvechart_logo.svg"
                alt="YveChart Logo"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">
              YveChart
            </span>
          </Link>
        </div>

        {/* Centered Text Content */}
        <div className="relative z-10 flex flex-col justify-center max-w-lg mb-20 animate-slide-up">
          <h2 className="text-5xl font-bold text-white leading-tight mb-6">
            Turn complex ideas into clear visuals.
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed text-balance">
            Design system architectures visually, collaborate with your team in
            real-time, and document your infrastructure with ease.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} YveChart Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-col items-center justify-center p-12 bg-white w-full">
        <div className="w-full max-w-md space-y-2 animate-fade-in">
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
