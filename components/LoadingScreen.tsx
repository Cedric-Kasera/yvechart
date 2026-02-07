import React from "react";

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingScreen({
  title = "Loading...",
  subtitle,
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Loader Spinner */}
        <div className="flex justify-center mb-6">
          <div className="loader"></div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>

      <style jsx>{`
        .loader {
          width: 40px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #f15757;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          animation: l1 2s infinite cubic-bezier(0.3, 1, 0, 1);
        }
        @keyframes l1 {
          33% {
            border-radius: 0;
            background: #514b82;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          66% {
            border-radius: 0;
            background: #ffa516;
            clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
}
