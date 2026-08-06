import type { StrengthResult, PasswordRule } from "./types.js";

export function checkStrength(password: string): StrengthResult {
  const PASSWORD_RULES: PasswordRule[] = [
    { test: (p) => p.length >= 8, id: "length", msg: "at least 8 chars" },
    {
      test: (p) => /[A-Z]/.test(p),
      id: "upper",
      msg: "at least 1 uppercase char",
    },
    {
      test: (p) => /[a-z]/.test(p),
      id: "lower",
      msg: "at least 1 lowercase char",
    },
    {
      test: (p) => /[0-9]/.test(p),
      id: "num",
      msg: "at least 1 number",
    },
    {
      test: (p) => /[!@#$%^&*(),.?":{}|<>_\-]/.test(p),
      id: "sym",
      msg: "at least 1 symbol",
    },
  ];

  const failedRules: string[] = PASSWORD_RULES.filter(
    (rule) => !rule.test(password),
  ).map((rule) => rule.msg);

  const passed = failedRules.length === 0;

  return {
    strength: passed ? "strong" : failedRules.length <= 2 ? "medium" : "weak",
    passed,
    failedRules,
  };
}
