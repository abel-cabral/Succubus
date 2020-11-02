import { BotKeys } from '../environments';
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

export class MyWatson {
  private assistant_id = BotKeys.WATSON_ASSISTANT;
  private assistant = new AssistantV2({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({ apikey: BotKeys.WATSON_KEY }),
    serviceUrl: BotKeys.WATSON_URL,
  });

  public createWatsonSession(): Promise<any> {
    return this.assistant
      .createSession({ assistantId: this.assistant_id })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        return res;
      })
      .catch((err) => console.log(err));
      // res.result.session_id
  }

  public closeWatsonSession(assistant_id: string, session_id: string): Promise<any> {
    return this.assistant
      .deleteSession({
        assistantId: assistant_id,
        sessionId: session_id,
      })
      .then((res) =>  console.log(JSON.stringify(res, null, 2)))
      .catch((err) => console.log(err));
  }

  public sendMessage(msg: string): any {
    this.createWatsonSession().then(res => this.closeWatsonSession(this.assistant_id, res.result.session_id))
    /*
    console.log(this.session_id);
    return this.assistant
      .message({
        assistantId: this.assistant_id,
        sessionId: '6b7b0658-c4b0-40de-9d3e-cd088e517182',
        input: {
          message_type: 'text',
          text: msg,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.log(err);
      });
      */
  }
}
