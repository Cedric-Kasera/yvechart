'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AuthLayout from '@/components/Auth/AuthLayout';
import InputField from '@/components/Auth/InputField';
import PasswordInput from '@/components/Auth/PasswordInput';
import PasswordStrengthIndicator from '@/components/Auth/PasswordStrengthIndicator';
import OAuthButtons from '@/components/Auth/OAuthButtons';
import { validateEmail, validatePasswordStrength, validatePasswordMatch } from '@/lib/validation';
import { signup } from '@/api/auth';
import useUserStore from '@/store/useUserStore';

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useUserStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'fair' | 'good' | 'strong'>('weak');
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!username || username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const validation = validatePasswordStrength(password);
      if (!validation.isValid) {
        newErrors.password = validation.feedback;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must accept the Terms & Conditions and Privacy Policy';
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
      const res = await signup({
        name: username,
        email,
        password,
        terms_accepted: agreeToTerms,
      });

      if (!res.success) {
        toast.error(res.message || 'Signup failed');
        return;
      }

      setAuth(res.data.user, res.data.token);
      toast.success(res.message || 'Account created successfully');
      router.push('/u/workspace/create');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(true);
    }
  };

  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    agreeToTerms &&
    !errors.username &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.terms &&
    validatePasswordStrength(password).isValid &&
    validatePasswordMatch(password, confirmPassword);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join YveChart and start designing your architectures."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Preferred Name"
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="John Doe"
          error={errors.username}
        />

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
          {password && (
            <PasswordStrengthIndicator strength={passwordStrength} feedback={passwordFeedback} />
          )}
        </div>

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="••••••••"
          error={errors.confirmPassword}
        />

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 mt-0.5 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              I agree to the{' '}
              <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <p className="text-error-500 text-sm mt-2">{errors.terms}</p>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all cursor-pointer ${
            isFormValid && !loading
              ? 'bg-primary-500 hover:bg-primary-600 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <OAuthButtons />

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
