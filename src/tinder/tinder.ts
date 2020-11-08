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
    return this.genericRequest('/profile');
  }

  public applicant(): Promise<any> {
    return this.genericRequest('/user/recs');
  }

  public like(applicantId: string): Promise<OnLikeModel> {
    return this.genericRequest('/like/' + applicantId);
  }

  public dislike(applicantId: string): Promise<OnPassModel> {
    return this.genericRequest('/pass/' + applicantId);
  }

  public sendMessage(msg: string, applicantId: string): Promise<any> {
    return this.genericRequest('/user/matches/' + applicantId, { message: msg }, 'POST');
  }
  
  public receiveMessage(count = 10, message = 2): Promise<any> {
    return this.genericRequest(`/v2/matches/?locale=pt&count=${count}&message=${message}`);
  }

  public allData(): Promise<any[]> {
    return this.genericRequest('/updates', {}, 'POST');
  }

  public unmatchPerson(id: string): Promise<any> {
    return this.genericRequest('/user/matches/' + id, {}, 'DELETE');
  }

  /*
  public allMatches(): {

  }*/

  private genericRequest(complementsURL: string, data: any = '', method: any = 'GET'): Promise<any> {
    const body: AxiosRequestConfig = this.config;    
    body.url = complementsURL;
    body.method = method;
    body.data = data;
    return axios(body)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }
}
