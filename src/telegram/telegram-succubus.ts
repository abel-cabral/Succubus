import { Telegraf, Markup, Extra } from 'telegraf';
import moment from 'moment';
import { MyTinder } from '../tinder/tinder';
import { Recs, MessageModel } from '../models/tinder.model';
import { MyWatson } from '../watson/watson';
import { IdentifyChatModel } from '../models/telegram.model';
import { WatsonResponseModel } from '../models/watson.model';
import { TelegrafContext } from 'telegraf/typings/context';
import { BotKeys } from '../environments';


const _ = require('lodash');
const hash = require('js-hash-code');
moment.locale('pt-br');

export class TelegramSuccubus {
  private bot: Telegraf<TelegrafContext> = new Telegraf(BotKeys.BOT_TOKEN);
  private myTelegramChatId: number | any = 0;
  private tinder = new MyTinder();
  private identifyChat: IdentifyChatModel[] = [];
  
  // private tinderAllDataObserver: any = this.dataObservable(this.tinderAllData);
  private tinderAllMessage: MessageModel[] = [];
  private tinderMatchesIds: string[] = [];

  // TINDER + WATSON
  private tinderMatches: any = [];
  private tinderAllData: any = {};

  // private myTelegram;
  // moment().format('LTS');

  constructor() {
    this.bot.start((ctx) => ctx.reply('Welcome, do you need do login'));
    this.bot.hears(BotKeys.MY_KEY, (ctx) => {
      ctx.reply('Login has been success');
      this.myTelegramChatId = ctx.from?.id;
      this.bot.stop();
      this.initServices();
    });
    this.bot.launch();
  }

  private initServices(): void {   
    this.myself();
    this.seeApplicant();
    this.seeApplicants();
    this.tinderMaganer(true);
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

  private tinderMaganer(firstTime = false): void {
    if (firstTime) {
      this.tinder.allData().then((res: any) => {
        this.tinderMatches = res.matches;
        this.tinderAllData = res;
        setTimeout(() => this.tinderMaganer(), 10000);
      });
    } else {
      this.tinder.allData().then((res: any) => {
        this.checkNewMatches(res.matches, this.tinderMatches);
        setTimeout(() => this.tinderMaganer(), 10000);
      });
    }
  }

  private checkingNewMessage(firstTime = false) {
    this.tinder.receiveMessage().then((res) => {
      const aux: MessageModel[] = [];
      console.log('Finding new messages');
      // Na primeira execução uma lista será salva com todos as conversas atuais.
      if (firstTime) {
        res.data.matches.map((r: any) => {
          r.messages.map((m: any) =>
            this.tinderAllMessage.push({
              from: m.from,
              message: m.message,
              sent_date: m.sent_date,
            }),
          );
        });
        this.checkingNewMessage();
      }

      // Uma lista interna e temporaria recebe os dados a cada nova requisição.
      res.data.matches.map((r: any) => {
        r.messages.map((m: any) =>
          aux.push({
            from: m.from,
            message: m.message,
            sent_date: m.sent_date,
          }),
        );
      });

      // Primeiro comparamos o hashcode das duas listas para saber se houveram atualizações.
      if (hash(this.tinderAllMessage) == hash(aux)) {
        console.log(`There isn't new messages`);
      } else {
        console.log(this.compareArrays(this.tinderAllMessage, aux));
        this.tinderAllMessage = aux;
      }
      // After some seconds we called the function again.
      setTimeout(() => this.checkingNewMessage(), 10000);
    });
  }


  // Compare two obj arrays and return the object that has been changed
  private compareArrays(a: any[], b: any[]): any[] {
    const comp = (otherArray: any[]) => (current: any) =>
      otherArray.filter((other: any) => hash(other) == hash(current)).length ==
      0;
    const onlyInA: any[] = a.filter(comp(b));
    const onlyInB: any[] = b.filter(comp(a));
    const result: any[] = onlyInA.concat(onlyInB);
    return onlyInB;
  }


  private demo(): void {
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

  private askHim(msg: string) {}


  // Create a session and send a message to Tinder match
  private callWatson(index: any, msg: string) { 
    const match = this.tinderMatches[index];   
    let watson = match.watson;
    
    if (!watson) {
      watson = new MyWatson();
    }    
        
    watson.createWatsonSession().then((res: any) => {
      watson
        .sendMessage(msg, res.result.session_id)
        .then((res: WatsonResponseModel | any) =>
          res.output.generic.map((r: any) => this.tinder.sendMessage(r.text, match.id)),
        );
    });
    // Save current session
    this.tinderMatches[index].watson = watson;
  }


  // Check if a new user was added to list
  private checkNewMatches(current: any, old: any): void {
    const comp = (otherArray: any[]) => (cent: any) =>
      otherArray.filter((other: any) => hash(other.id) == hash(cent.id)).length == 0;
    const tempArr: any[] = current.filter(comp(old));

    if (tempArr.length !== 0) {
      console.log(`There's a news match`);
      tempArr.map((res) => {
        this.bot.telegram.sendMessage(this.myTelegramChatId, `There's a new match with ${res.person.name}`);      
        this.tinderMatches = current;
        const index = current.findIndex((element: any) => element._id == res._id);       
        this.callWatson(index, '000A');
      });
    } else {
      console.log(`There isn't a new match`);
    }
  }


  // Recursive function to delete all matches
  private deleteAll(array: any[]): void {
    if (array.length === 0) {
      console.log('All Matches has been undone');
      return;
    }
    const unmatch = array.shift();
    this.tinder.unmatchPerson(unmatch.id).then(() => {
      console.log(unmatch.id + ' deleted');
      this.deleteAll(array);
    });
  }
}
