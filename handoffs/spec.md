# Spec: checkPasswordStrength

## Function

`export function checkPasswordStrength(password)` — evaluates a password string against length and complexity rules, returning score, validity, and missing requirements.

## Rules

1. Input validation: The `password` parameter must be a primitive string. If it is not a string (including `null`, `undefined`, numbers, booleans, or objects), throw a `TypeError`.
2. Length rule: The password length must be at least 8 characters.
3. Lowercase rule: The password must contain at least one lowercase letter (`a-z`).
4. Uppercase rule: The password must contain at least one uppercase letter (`A-Z`).
5. Number rule: The password must contain at least one digit (`0-9`).
6. Special character rule: The password must contain at least one special character (`!@#$%^&*()_+-=[]{};':"|,.<>/?~`).
7. Scoring and Output: `score` represents the total count of satisfied rules (0 to 5). `strength` maps to `"Very Weak"` (0-1), `"Weak"` (2), `"Moderate"` (3), `"Strong"` (4), and `"Very Strong"` (5). `isValid` is true only when `score === 5`. `missing` contains human-readable descriptions for any failed criteria.

## Return value

```javascript
{
  score: 0,             // number (integer from 0 to 5)
  strength: "Very Weak", // string ("Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong")
  isValid: false,       // boolean (true if all 5 criteria are met)
  missing: []           // string[] (list of unmet requirement descriptions)
}

```

## Test cases

| # | input | expected | reason |
| --- | --- | --- | --- |
| 1 | `""` | `{"score":0,"strength":"Very Weak","isValid":false,"missing":["At least 8 characters","Lowercase letter","Uppercase letter","Number","Special character"]}` | Empty string fails all criteria |
| 2 | `null` | Throws `TypeError` | Non-string input (`null`) must throw error |
| 3 | `12345678` | Throws `TypeError` | Non-string input (`number`) must throw error |
| 4 | `"abc"` | `{"score":1,"strength":"Very Weak","isValid":false,"missing":["At least 8 characters","Uppercase letter","Number","Special character"]}` | Fails length, upper, number, and special |
| 5 | `"abcdefgh"` | `{"score":2,"strength":"Weak","isValid":false,"missing":["Uppercase letter","Number","Special character"]}` | Meets length and lower; misses upper, number, special |
| 6 | `"ABCDEFGH"` | `{"score":2,"strength":"Weak","isValid":false,"missing":["Lowercase letter","Number","Special character"]}` | Meets length and upper; misses lower, number, special |
| 7 | `"Abcdefgh"` | `{"score":3,"strength":"Moderate","isValid":false,"missing":["Number","Special character"]}` | Meets length, lower, upper; misses number and special |
| 8 | `"Abcdef12"` | `{"score":4,"strength":"Strong","isValid":false,"missing":["Special character"]}` | Meets length, lower, upper, number; misses special |
| 9 | `"Abcdef12!"` | `{"score":5,"strength":"Very Strong","isValid":true,"missing":[]}` | Meets all 5 criteria exactly at boundary length |
| 10 | `"SecurePass99#"` | `{"score":5,"strength":"Very Strong","isValid":true,"missing":[]}` | Meets all criteria with a longer string |