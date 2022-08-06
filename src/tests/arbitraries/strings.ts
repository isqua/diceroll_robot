import fc from "fast-check";

import type { StringSharedConstraints } from "fast-check";

export const stringWithNoDigits = (constraints?: StringSharedConstraints) =>
    fc.string(constraints).filter((s) => !/[0-9]/.test(s));

const specialChars = "!@#$%^&*()_+";

export const specialChar = () =>
    fc
        .integer({ min: 0, max: specialChars.length - 1 })
        .map((i) => specialChars[i]);
