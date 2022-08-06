import { getRandomIntegerBetween, isPositiveInteger } from "../utils/numbers";
import { extractNumbers } from "../utils";

import type { Feature } from "../../types/feature";

export const TwoNumbersFeature: Feature = {
    canAnswer: (text: string) => {
        const numbers = extractNumbers(text);

        return numbers.length === 2 && numbers.every(isPositiveInteger);
    },

    getAnswer: (text: string) => {
        const [a, b] = extractNumbers(text);

        if (a < b) {
            return getRandomIntegerBetween(a, b).toString();
        } else {
            return getRandomIntegerBetween(b, a).toString();
        }
    },
};
