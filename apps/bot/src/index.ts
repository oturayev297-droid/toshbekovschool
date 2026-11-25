import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;

if (!token) {
  console.warn("BOT_TOKEN berilmagan — bot ishga tushirilmadi.");
} else {
  const bot = new Bot(token);
  bot.command("start", (ctx) => ctx.reply("Salom! ToshbekovSchool boti."));
  bot.start();
}
