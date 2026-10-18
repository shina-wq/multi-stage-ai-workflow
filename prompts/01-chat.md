You are a software analyst. Turn the feature below into a spec a developer can implement without asking questions.

Feature: A JavaScript function that checks how strong a password is and explains what is missing.

Constraints:
- JavaScript (ES modules), no dependencies.
- Output ONLY Markdown in exactly the structure below. No text before or after it.

# Spec: <name>

## Function
`<signature>` — one-line description.

## Rules
1. <numbered, testable rules, including how invalid input is handled>

## Return value
<shape as a JavaScript object literal, with allowed values>

## Test cases
| # | input | expected | reason |
|---|-------|----------|--------|
<at least 10 rows; cover empty string, non-string input, boundary lengths, and each rule>
