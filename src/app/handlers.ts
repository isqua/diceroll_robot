import type { Telegraf } from "telegraf";
import { detectFeature } from "./feature-detector";

const unhandledFeatureAnswer =
    "Sorry, I don’t know what to do with your message yet.";

export const registerHandlers = (bot: Telegraf) => {
    bot.start((ctx) => ctx.reply("Hi! I am the DiceRoll Robot!"));
    bot.help((ctx) => ctx.reply("Send me a number"));

    bot.on("text", async (ctx) => {
        try {
            const answer = detectFeature(ctx);

            if (answer) {
                await ctx.reply(answer, {
                    reply_to_message_id: ctx.message.message_id,
                });
            } else {
                await ctx.reply(unhandledFeatureAnswer, {
                    reply_to_message_id: ctx.message.message_id,
                });
            }
        } catch (err) {
            console.error(err);
        }
    });
};
