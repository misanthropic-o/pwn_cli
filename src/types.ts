export type Strength = "weak" | "medium" | "strong";

export interface StrengthResult {
  strength: Strength;
  passed: boolean;
  failedRules: string[];
}

export interface BreachResult {
  passwordBreached: boolean;
  times?: number;
}

export interface PasswordRule {
  test: (p: string) => boolean;
  id: string;
  msg: string;
}
