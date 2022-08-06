import fc from "fast-check";

import type { FloatConstraints } from "fast-check";

export const strictFloat = (constraints?: FloatConstraints) =>
    fc.float(constraints).filter((n) => !Number.isInteger(n));
