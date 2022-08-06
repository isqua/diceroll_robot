import { describe, expect, it } from "@jest/globals";
import fc from "fast-check";
import {
    specialChar,
    stringWithNoDigits,
    strictFloat,
} from "../../tests/arbitraries";

import { SingleNumberFeature } from "./single-number";

describe("features/single-number", () => {
    describe("canAnswer", () => {
        it("should accept any positive integer", () => {
            fc.assert(
                fc.property(fc.integer({ min: 1 }), (n) =>
                    SingleNumberFeature.canAnswer(n.toString())
                )
            );
        });

        it("should not accept negative integer", () => {
            fc.assert(
                fc.property(
                    fc.integer({ max: 0 }),
                    (n) => SingleNumberFeature.canAnswer(n.toString()) === false
                )
            );
        });

        it("should not accept float", () => {
            fc.assert(
                fc.property(
                    strictFloat(),
                    (n) => SingleNumberFeature.canAnswer(n.toString()) === false
                )
            );
        });

        it("should not accept two or more numbers", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.integer({ min: 1 }), { minLength: 2 }),
                    (arr) =>
                        SingleNumberFeature.canAnswer(arr.join(" ")) === false
                )
            );
        });

        it("should accept a number in text", () => {
            fc.assert(
                fc.property(
                    stringWithNoDigits({ minLength: 1, maxLength: 10 }),
                    specialChar(),
                    (s, char) => SingleNumberFeature.canAnswer(`${s} 42${char}`)
                )
            );

            fc.assert(
                fc.property(
                    stringWithNoDigits({ minLength: 1, maxLength: 10 }),
                    specialChar(),
                    (s, char) => SingleNumberFeature.canAnswer(`${char}42 ${s}`)
                )
            );
        });
    });

    describe("getAnswer", () => {
        it("should return a random number between 1 and passed number", () => {
            fc.assert(
                fc.property(fc.integer({ min: 1 }), (n) => {
                    const answer = parseInt(
                        SingleNumberFeature.getAnswer(n.toString()),
                        10
                    );

                    return 1 <= answer && answer <= n;
                })
            );
        });
    });
});
