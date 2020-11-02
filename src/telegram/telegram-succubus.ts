import { Telegraf, Markup, Extra } from 'telegraf';
import moment from 'moment';
import { BotKeys } from '../environments';
import { MyTinder } from '../tinder/tinder';
import { Recs } from '../models/tinder.model';

export class TelegramSuccubus {
  private bot = new Telegraf(BotKeys.BOT_TOKEN);
  private tinder = new MyTinder();
  //moment().format('LTS');

  constructor() {
    moment.locale('pt-br');
    this.serverBack();

    this.sayHello();
    this.seeApplicant();
    this.seeApplicants();
    this.bot.hears('Assalamualaikum', (ctx) => ctx.reply('Waalaikumsalam'));
    this.myself();
    this.bot.launch();
  }

  private serverBack(): void {
    // each time that hear something, will execute it
    this.bot.use(async (ctx: any, next: any) => {
      const start = new Date();
      await next();
      // const response_time = new Date() - start;
      // const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`
      // console.log(`Chat from ${chat_from} (Response Time: ${response_time})`)
    });
  }

  private sayHello(): void {
    this.bot.hears('hello', (ctx: any) => {
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
  }

  private seeApplicant(): void {
    this.bot.hears('Pretendente', (ctx) => {
      this.tinder.applicant().then((res: Recs) => {
        ctx.replyWithPhoto(
          {
            url: res.results[0].photos[0].url,
            filename: res.results[0].name,
          },
          { caption: res.results[0].name }
        );
      });
    });
  }

  private seeApplicants(): void {
    this.bot.hears('Pretendentes', (ctx) => {
      this.tinder.applicant().then((res: Recs) => {
        for (let i = 0; i < 5; i++) {
          ctx.replyWithPhoto(
            {
              url: res.results[i].photos[0].url,
              filename: res.results[i].name,
            },
            { caption: res.results[i].name },
          );
        }
      });
    });
  }

  private myself() {
    this.bot.hears('Quem sou eu?', (ctx) => {
      this.tinder
        .myProfile()
        .then((res) =>
          ctx.reply(
            `Your name master is ${res.name} or do you prefer to be called ${res.username}?`,
          ),
        );
    });
  }
}
