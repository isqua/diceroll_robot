import { getRandomIntegerBetween } from "../utils/numbers";

import type { Feature } from "../../types/feature";

export const WordsFeature: Feature = {
    canAnswer: (text: string) => {
        return text.split(/\s+/).length > 1;
    },
    getAnswer: (text: string) => {
        const options = text.split(/\s+/);
        const answerIndex = getRandomIntegerBetween(0, options.length - 1);

        return options[answerIndex];
    },
};
