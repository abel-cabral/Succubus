import { Telegraf } from 'telegraf';
import { BotKeys } from './environments';


const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const bot = new Telegraf(BotKeys.BOT_TOKEN);
console.log(bot)

const moment = require('moment');
moment.locale('pt-br');
//moment().format('LTS');

// each time that hear something, will execute it
bot.use(async (ctx: any, next: any) => {
  const start = new Date();
  await next();
  // const response_time = new Date() - start;
  // const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`
  // console.log(`Chat from ${chat_from} (Response Time: ${response_time})`)
});

bot.hears('hello', (ctx: any) => {
  ctx.reply(
    '<b>Hello</b>. <i>How are you today?</i>',
    Extra.HTML().markup(
      Markup.inlineKeyboard([
        Markup.callbackButton('Not bad', 'not bad'),
        Markup.callbackButton('All right', 'all right'),
      ]),
    ),
  );
});

bot.hears('Assalamualaikum', (ctx) => ctx.reply('Waalaikumsalam'));

bot.launch();
