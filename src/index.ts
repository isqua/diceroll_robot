import { Telegraf } from "telegraf";
import { registerHandlers } from "./app/handlers";

const bot = new Telegraf(process.env.BOT_TOKEN);

registerHandlers(bot);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
