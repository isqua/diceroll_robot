import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
} from "@jest/globals";
import { Telegraf } from "telegraf";

import { BotTester, BOT_TOKEN } from "../tests/helpers";
import { registerHandlers } from "./handlers";

describe("handlers", () => {
    const tester = new BotTester(BOT_TOKEN);
    let bot: Telegraf;

    beforeAll(() => {
        tester.launch();
    });

    beforeEach(async () => {
        if (bot) {
            bot.stop();
        }

        bot = new Telegraf(BOT_TOKEN);
        registerHandlers(bot);
        await bot.launch();
    });

    afterEach(() => {
        bot.stop();
    });

    it("should return a random number between 1 and passed number", async () => {
        const n = Math.round(Math.random() * 10);

        const reply = await tester.getMessageReply(n.toString());

        expect(reply.reply_to_message_id).toEqual(tester.getLastMessageId());

        expect(parseInt(reply.text, 10)).toBeLessThanOrEqual(n);
        expect(parseInt(reply.text, 10)).toBeGreaterThanOrEqual(1);
    });

    it("should return a random number between two passed numbers", async () => {
        const a = Math.round(Math.random() * 10);
        const b = Math.round(Math.random() * 10);

        const reply = await tester.getMessageReply(`${a} ${b}`);

        expect(reply.reply_to_message_id).toEqual(tester.getLastMessageId());

        expect(parseInt(reply.text, 10)).toBeLessThanOrEqual(Math.max(a, b));
        expect(parseInt(reply.text, 10)).toBeGreaterThanOrEqual(Math.min(a, b));
    });

    it("should apologize if no features is found", async () => {
        const reply = await tester.getMessageReply("hi");

        expect(reply.reply_to_message_id).toEqual(tester.getLastMessageId());
        expect(reply.text).toMatch(/Sorry/);
    });
});
