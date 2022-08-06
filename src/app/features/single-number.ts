import { getRandomIntegerBetween, isPositiveInteger } from "../utils/numbers";
import { extractNumbers } from "../utils";

import type { Feature } from "../../types/feature";

export const SingleNumberFeature: Feature = {
    canAnswer: (text: string) => {
        const numbers = extractNumbers(text);

        if (numbers.length === 1) {
            return isPositiveInteger(numbers[0]);
        }

        return false;
    },
    getAnswer: (text: string) => {
        const [n] = extractNumbers(text);

        return getRandomIntegerBetween(1, n).toString();
    },
};
