import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-md font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? "border-error-500 focus:ring-error-500"
            : "border-gray-300 focus:ring-primary-500"
        }`}
      />
      {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
