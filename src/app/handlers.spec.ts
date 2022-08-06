import { afterEach, beforeAll, beforeEach, describe, expect, it } from "@jest/globals";
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

    it("should greet on “hi”", async () => {
        const reply = await tester.getMessageReply("hi");

        expect(reply).toMatchObject({
            text: "Hello!",
            reply_to_message_id: tester.getLastMessageId(),
        });
    });

    it("should reply “see you” on “bye”", async () => {
        const reply = await tester.getMessageReply("bye");

        expect(reply).toMatchObject({
            text: "See you!",
            reply_to_message_id: tester.getLastMessageId(),
        });
    });
});
