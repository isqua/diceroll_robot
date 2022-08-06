import { describe, it } from "@jest/globals";
import fc from "fast-check";

import { word } from "../../tests/arbitraries";
import { WordsFeature } from "./words";

describe("features/words", () => {
    describe("canAnswer", () => {
        it("should accept a string which contains at least two words", () => {
            fc.assert(
                fc.property(
                    fc.array(word({ maxLength: 10 }), {
                        minLength: 2,
                        maxLength: 20,
                    }),
                    (arr) => WordsFeature.canAnswer(arr.join(" "))
                )
            );
        });
    });

    describe("getAnswer", () => {
        it("should pick a random word from text", () => {
            fc.assert(
                fc.property(
                    fc.array(word({ maxLength: 10 }), {
                        minLength: 2,
                        maxLength: 20,
                    }),
                    (arr) => {
                        const answer = WordsFeature.getAnswer(arr.join(" "));

                        return arr.includes(answer);
                    }
                )
            );
        });
    });
});
