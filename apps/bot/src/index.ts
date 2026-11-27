import { Bot } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.warn("TELEGRAM_BOT_TOKEN berilmagan — bot ishga tushirilmadi.");
} else {
  const bot = new Bot(token);
  bot.command("start", (ctx) => ctx.reply("Salom! ToshbekovSchool boti."));
  bot.start();
}
