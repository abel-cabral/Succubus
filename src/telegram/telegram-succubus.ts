import { Telegraf, Markup, Extra } from 'telegraf';
import moment from 'moment';
import { BotKeys } from '../environments';
import { MyTinder } from '../tinder/tinder';
import { Recs } from '../models/tinder.model';
import { MyWatson } from '../watson/watson';
import { IdentifyChatModel } from '../models/telegram.model';
import { WatsonResponseModel } from '../models/watson.model';
import { TelegrafContext } from 'telegraf/typings/context';
moment.locale('pt-br');

export class TelegramSuccubus {
  private bot: Telegraf<TelegrafContext> = new Telegraf(BotKeys.BOT_TOKEN);
  private tinder = new MyTinder();
  private identifyChat: IdentifyChatModel[] = [];
  private tinderMessages: any[] = [];
  // private myTelegram;
  // moment().format('LTS');

  constructor() {
    this.bot.start((ctx) => ctx.reply('Welcome, do you need do login'));
    this.bot.hears(BotKeys.MY_KEY, (ctx: any) => {      
      ctx.reply("Login has been success") 
      this.bot.stop();
      this.initServices();      
    });
    this.bot.launch();
  }

  private initServices(): void {
    // this.middleware();
    const watson = new MyWatson();
    watson.createWatsonSession().then((res) => {
      watson
        .sendMessage('000A', res.result.session_id)
        .then((res: WatsonResponseModel | any) =>
          res.output.generic.map((r: any) => console.log(r.text)),
        );
    });

    this.updateTinderMessages();

    this.sayHello();
    this.seeApplicant();
    this.seeApplicants();

    this.myself();
    this.bot.launch();    
  }

  private middleware(): void {
    // Middleware is an essential part of any modern framework.
    this.bot.use(async (ctx: any, next) => {
      /*
      if(ctx.update.message.text === '0001') {
        await ctx.reply('You don\'t have access. Go away.');
        next();
      } else {
        await next();
      }*/
    });
  }

  private sayHello(): void {
    this.bot.hears('hello', (ctx: any) => {
      const initWatson = new MyWatson();
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
          { caption: res.results[0].name },
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

  private startConversation(): void {
    this.tinder.applicant().then((res: Recs) => {
      res.results.map((data, index) => {
        if (index < 5) {
          this.identifyChat[index].tinder = data;
          //this.
        }
      });
    });
  }

  private updateTinderMessages(): void {
    this.tinder.allConversations().then((res) => {
      this.tinderMessages = res.matches;
      setTimeout(() => {
        console.log('Getting messages');
        this.updateTinderMessages();
      }, 60000);
    });
  }

  private askHim(msg: string) {}
}
