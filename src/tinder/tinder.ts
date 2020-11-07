import axios, { AxiosRequestConfig } from 'axios';
import { BotKeys } from '../environments';
import { OnLikeModel, OnPassModel } from '../models/tinder.model';

export class MyTinder {
  private config: AxiosRequestConfig = {
    baseURL: 'https://api.gotinder.com',
    headers: {
      'X-Auth-Token': BotKeys.TINDER_TOKEN,
    },
  };

  constructor() {}

  public myProfile(): Promise<any> {
    return this.genericGET('/profile');
  }

  public applicant(): Promise<any> {
    return this.genericGET('/user/recs');
  }

  public like(applicantId: string): Promise<OnLikeModel> {
    return this.genericGET('/like/' + applicantId);
  }

  public dislike(applicantId: string): Promise<OnPassModel> {
    return this.genericGET('/pass/' + applicantId);
  }

  public sendMessage(msg: string, applicantId: string): Promise<any> {
    return this.genericGET('/user/matches/' + applicantId, { message: msg });
  }

  public allConversations(): Promise<any> {
    return this.genericGET('/updates', {});
  }

  private genericGET(complementsURL: string, data: any = ''): Promise<any> {
    const body: AxiosRequestConfig = this.config;    
    body.url = complementsURL;
    body.method = data ? 'post' : 'get';
    body.data = data;
    return axios(body)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }
}
