export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  strength: "weak" | "fair" | "good" | "strong";
  feedback: string;
} => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      strength: "weak",
      feedback: `Password must be at least ${minLength} characters`,
    };
  }

  const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

  if (strengthScore === 1) {
    return {
      isValid: false,
      strength: "weak",
      feedback: "Add uppercase, numbers, or special characters",
    };
  }

  if (strengthScore === 2) {
    return {
      isValid: true,
      strength: "fair",
      feedback: "Add more character variety",
    };
  }

  if (strengthScore === 3) {
    return {
      isValid: true,
      strength: "good",
      feedback: "Good password strength",
    };
  }

  return {
    isValid: true,
    strength: "strong",
    feedback: "Strong password",
  };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
