import React from "react";

interface PasswordStrengthIndicatorProps {
  strength: "weak" | "fair" | "good" | "strong";
  feedback: string;
}

export default function PasswordStrengthIndicator({
  strength,
  feedback,
}: PasswordStrengthIndicatorProps) {
  const strengthColors = {
    weak: "bg-error-500",
    fair: "bg-warning-500",
    good: "bg-info-500",
    strong: "bg-success-500",
  };

  const strengthLabels = {
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        <div
          className={`h-1 flex-1 rounded-full ${
            strength === "weak" || strength === "fair" || strength === "good" || strength === "strong"
              ? strengthColors[strength]
              : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-1 flex-1 rounded-full ${
            strength === "fair" || strength === "good" || strength === "strong"
              ? strengthColors[strength]
              : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-1 flex-1 rounded-full ${
            strength === "good" || strength === "strong"
              ? strengthColors[strength]
              : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-1 flex-1 rounded-full ${
            strength === "strong" ? strengthColors[strength] : "bg-gray-300"
          }`}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-600">{feedback}</p>
        <span className={`text-xs font-medium ${
          strength === "weak"
            ? "text-error-500"
            : strength === "fair"
            ? "text-warning-500"
            : strength === "good"
            ? "text-info-500"
            : "text-success-500"
        }`}>
          {strengthLabels[strength]}
        </span>
      </div>
    </div>
  );
}
