import test from "node:test";
import assert from "node:assert/strict";
import { checkPasswordStrength } from "../src/passwordValidator.js";

test("1. empty string fails all criteria", () => {
  assert.deepEqual(checkPasswordStrength(""), {
    score: 0,
    strength: "Very Weak",
    isValid: false,
    missing: [
      "At least 8 characters",
      "Lowercase letter",
      "Uppercase letter",
      "Number",
      "Special character",
    ],
  });
});

test("2. null throws TypeError", () => {
  assert.throws(() => checkPasswordStrength(null), TypeError);
});

test("3. number throws TypeError", () => {
  assert.throws(() => checkPasswordStrength(12345678), TypeError);
});

test("4. short lowercase string", () => {
  assert.deepEqual(checkPasswordStrength("abc"), {
    score: 1,
    strength: "Very Weak",
    isValid: false,
    missing: [
      "At least 8 characters",
      "Uppercase letter",
      "Number",
      "Special character",
    ],
  });
});

test("5. lowercase string of minimum length", () => {
  assert.deepEqual(checkPasswordStrength("abcdefgh"), {
    score: 2,
    strength: "Weak",
    isValid: false,
    missing: ["Uppercase letter", "Number", "Special character"],
  });
});

test("6. uppercase string of minimum length", () => {
  assert.deepEqual(checkPasswordStrength("ABCDEFGH"), {
    score: 2,
    strength: "Weak",
    isValid: false,
    missing: ["Lowercase letter", "Number", "Special character"],
  });
});

test("7. mixed-case string of minimum length", () => {
  assert.deepEqual(checkPasswordStrength("Abcdefgh"), {
    score: 3,
    strength: "Moderate",
    isValid: false,
    missing: ["Number", "Special character"],
  });
});

test("8. mixed-case string with a number", () => {
  assert.deepEqual(checkPasswordStrength("Abcdef12"), {
    score: 4,
    strength: "Strong",
    isValid: false,
    missing: ["Special character"],
  });
});

test("9. valid password at the boundary length", () => {
  assert.deepEqual(checkPasswordStrength("Abcdef12!"), {
    score: 5,
    strength: "Very Strong",
    isValid: true,
    missing: [],
  });
});

test("10. valid longer password", () => {
  assert.deepEqual(checkPasswordStrength("SecurePass99#"), {
    score: 5,
    strength: "Very Strong",
    isValid: true,
    missing: [],
  });
});
