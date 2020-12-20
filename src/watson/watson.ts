import { BotKeys } from '../environments';
import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

export class MyWatson {
  private assistant_id = BotKeys.WATSON_ASSISTANT_ID;
  private assistant = new AssistantV2({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({ apikey: BotKeys.WATSON_API_KEY }),
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
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  public sendMessage(msg: string, sessionId: string): Promise<any> {
    return this.assistant
      .message({
        assistantId: this.assistant_id,
        sessionId: sessionId,
        input: {
          message_type: 'text',
          text: msg,
        },
      })
      .then((res) => res.result)
      .catch((err) => {
        console.log(err);
      });
  }
}
