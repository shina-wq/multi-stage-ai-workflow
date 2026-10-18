const SPECIAL_CHARACTERS = `!@#$%^&*()_+-=[]{};':"|,.<>/?~`;

export function checkPasswordStrength(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  const criteria = [
    {
      satisfied: password.length >= 8,
      description: "At least 8 characters",
    },
    {
      satisfied: /[a-z]/.test(password),
      description: "Lowercase letter",
    },
    {
      satisfied: /[A-Z]/.test(password),
      description: "Uppercase letter",
    },
    {
      satisfied: /[0-9]/.test(password),
      description: "Number",
    },
    {
      satisfied: [...password].some((character) =>
        SPECIAL_CHARACTERS.includes(character)
      ),
      description: "Special character",
    },
  ];

  const score = criteria.filter((criterion) => criterion.satisfied).length;
  const strength =
    score <= 1
      ? "Very Weak"
      : score === 2
        ? "Weak"
        : score === 3
          ? "Moderate"
          : score === 4
            ? "Strong"
            : "Very Strong";

  return {
    score,
    strength,
    isValid: score === 5,
    missing: criteria
      .filter((criterion) => !criterion.satisfied)
      .map((criterion) => criterion.description),
  };
}
