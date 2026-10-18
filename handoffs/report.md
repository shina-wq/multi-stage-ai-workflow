# Report: checkPasswordStrength

## 1. Final test result

**10 / 10 passed** (`npm test` → `node --test`, 0 failed, 0 skipped).

## 2. Fixes made

None. All tests passed on the first run. I checked `src/passwordValidator.js` and `tests/passwordValidator.test.js` against `handoffs/spec.md`:

- The source matches every rule: the `typeof` string check (which also rejects `new String(...)` wrapper objects, since only primitive strings are allowed), the length ≥ 8 check, the `a-z` / `A-Z` / `0-9` checks, the special-character set copied character for character, and the score-to-strength mapping with `isValid === (score === 5)`.
- The 10 tests match the 10 spec test cases exactly (same inputs, same expected objects, same `missing` order).

## 3. Ambiguities in the spec

1. **Test case 9's "boundary length".** The reason says `"Abcdef12!"` meets all criteria "exactly at boundary length", but that string has 9 characters and the minimum is 8, so it doesn't actually test the boundary. Case 8 (`"Abcdef12"`, 8 chars) is the real boundary case. No 7-character case checks that length fails just below the minimum.
2. **Order of `missing`.** The spec doesn't say what order `missing` should be in. The examples imply rule order (length, lowercase, uppercase, number, special), and the tests use `deepEqual`, so the order matters.
3. **Exact `missing` strings.** Rule 7 only says "human-readable descriptions". The exact wording (`"At least 8 characters"`, `"Lowercase letter"`, etc.) appears only in the test-case table.
4. **Special-character set.** The set leaves out some common symbols: backslash `\`, backtick `` ` ``, and space. It's unclear whether that's on purpose. Right now, `"Abcdef12\\"` would be scored as missing a special character.
5. **Non-ASCII characters.** Letters like `é` or `Ä`, and non-ASCII digits, count toward no rule except length. The spec's ASCII ranges suggest this is intended, but it isn't stated.
6. **Length unit.** "Length" isn't defined. The code uses `String.prototype.length` (UTF-16 code units), so one emoji can count as 2 characters toward the 8-character minimum.
7. **TypeError message.** The spec doesn't give an error message. The code uses `"Password must be a string"`, and the tests only check the error type.
8. **Untested input types.** Rule 1 lists `undefined`, booleans and objects as invalid, but only `null` and a number are tested. The code handles all of them correctly through the `typeof` check.
