import React from "react";
import Image from "next/image";

interface OAuthButtonsProps {
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
}

export default function OAuthButtons({
  onGoogleClick,
  onAppleClick,
}: OAuthButtonsProps) {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-gray-600 font-medium">
        Or continue with
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onGoogleClick}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 cursor-pointer"
        >
          <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
          <span>Google</span>
        </button>
        <button
          onClick={onAppleClick}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 cursor-pointer"
        >
          <Image src="/apple-logo.svg" alt="Apple" width={24} height={24} />
          <span>Apple</span>
        </button>
      </div>
    </div>
  );
}
