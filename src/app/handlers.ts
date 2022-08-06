import type { Telegraf } from "telegraf";

export const registerHandlers = (bot: Telegraf) => {
    bot.start((ctx) => ctx.reply("Hi! I am the DiceRoll Robot!"));
    bot.help((ctx) => ctx.reply("Send me a number"));

    bot.hears("hi", async (ctx) => {
        try {
            await ctx.reply("Hello!", {
                reply_to_message_id: ctx.message.message_id,
            });
        } catch (err) {
            console.error(err);
        }
    });

    bot.hears("bye", async (ctx) => {
        try {
            await ctx.reply("See you!", {
                reply_to_message_id: ctx.message.message_id,
            });
        } catch (err) {
            console.error(err);
        }
    });
};
