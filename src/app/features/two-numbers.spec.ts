import { describe, it } from "@jest/globals";
import fc from "fast-check";
import { specialChar, stringWithNoDigits } from "../../tests/arbitraries";

import { TwoNumbersFeature } from "./two-numbers";

describe("features/two-numbers", () => {
    describe("canAnswer", () => {
        it("should accept any pair of positive integers", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1 }),
                    fc.integer({ min: 1 }),
                    (a, b) => TwoNumbersFeature.canAnswer(`${a} ${b}`)
                )
            );
        });

        it("should not accept negative integers", () => {
            fc.assert(
                fc.property(
                    fc.integer({ max: 0 }),
                    fc.integer(),
                    (a, b) => TwoNumbersFeature.canAnswer(`${a} ${b}`) === false
                )
            );

            fc.assert(
                fc.property(
                    fc.integer(),
                    fc.integer({ max: 0 }),
                    (a, b) => TwoNumbersFeature.canAnswer(`${a} ${b}`) === false
                )
            );

            fc.assert(
                fc.property(
                    fc.integer({ max: 0 }),
                    fc.integer({ max: 0 }),
                    (a, b) => TwoNumbersFeature.canAnswer(`${a} ${b}`) === false
                )
            );
        });

        it("should not accept more than two integers", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.integer({ min: 0 }), { minLength: 3 }),
                    (arr) =>
                        TwoNumbersFeature.canAnswer(arr.join(" ")) === false
                )
            );
        });

        it("should accept integers in a text", () => {
            fc.assert(
                fc.property(
                    stringWithNoDigits({ minLength: 1, maxLength: 10 }),
                    specialChar(),
                    (s, char) =>
                        TwoNumbersFeature.canAnswer(`${s} 42${char} 35`)
                )
            );

            fc.assert(
                fc.property(
                    stringWithNoDigits({ minLength: 1, maxLength: 10 }),
                    specialChar(),
                    (s, char) =>
                        TwoNumbersFeature.canAnswer(`42${char} ${s} ${char}99`)
                )
            );
        });
    });

    describe("getAnswer", () => {
        it("should return a random number between passed numbers", () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1 }),
                    fc.integer({ min: 1 }),
                    (a, b) => {
                        const answer = parseInt(
                            TwoNumbersFeature.getAnswer(`${a} ${b}`),
                            10
                        );

                        if (a < b) {
                            return a <= answer && answer <= b;
                        } else {
                            return b <= answer && answer <= a;
                        }
                    }
                )
            );
        });
    });
});
