"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { activateAccount } from "@/api/auth";

type ActivationStatus = "loading" | "success" | "error";

export default function ActivatePage() {
  const params = useParams();
  const token = params.token as string;

  const [status, setStatus] = useState<ActivationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid activation link.");
      return;
    }

    const activate = async () => {
      try {
        const res = await activateAccount(token);
        if (res.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(
            res.message || "Activation failed. The link may have expired.",
          );
        }
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again later.");
      }
    };

    activate();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 shadow-sm">
              <Image
                src="/yvechart_logo.svg"
                alt="YveChart Logo"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-wide">
              YveChart
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-6">
                <svg
                  className="w-12 h-12 animate-spin text-primary-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Activating your account...
              </h2>
              <p className="text-sm text-gray-500">
                Please wait while we verify your activation link.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Activation Successful!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Your account has been activated. You can now log in and start
                designing your architectures.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                Go to Login
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Activation Failed
              </h2>
              <p className="text-sm text-gray-500 mb-6">{errorMessage}</p>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                Go to Login
              </Link>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} YveChart Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
