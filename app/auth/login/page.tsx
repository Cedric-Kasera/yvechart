"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthLayout from "@/components/Auth/AuthLayout";
import InputField from "@/components/Auth/InputField";
import PasswordInput from "@/components/Auth/PasswordInput";
import PasswordStrengthIndicator from "@/components/Auth/PasswordStrengthIndicator";
import OAuthButtons from "@/components/Auth/OAuthButtons";
import { validateEmail, validatePasswordStrength } from "@/lib/validation";
import { login } from "@/api/auth";
import useUserStore from "@/store/useUserStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "fair" | "good" | "strong"
  >("weak");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const validation = validatePasswordStrength(password);
      if (!validation.isValid) {
        newErrors.password = validation.feedback;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      const validation = validatePasswordStrength(value);
      setPasswordStrength(validation.strength);
      setPasswordFeedback(validation.feedback);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await login({ email, password });

      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }

      setAuth(res.data.user, res.data.token);
      toast.success(res.message || "Login successful");

      if (res.data.has_workspace && res.data.workspace) {
        router.push(`/u/workspace/${res.data.workspace.slug}`);
      } else {
        router.push("/u/workspace/create");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    email &&
    password &&
    !errors.email &&
    !errors.password &&
    validatePasswordStrength(password).isValid;

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to your YveChart account to continue designing"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
        />

        <div>
          <PasswordInput
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            error={errors.password}
          />
          {/* {password && (
            <PasswordStrengthIndicator
              strength={passwordStrength}
              feedback={passwordFeedback}
            />
          )} */}
        </div>

        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all cursor-pointer ${
            isFormValid && !loading
              ? "bg-primary-500 hover:bg-primary-600 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <OAuthButtons />

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
