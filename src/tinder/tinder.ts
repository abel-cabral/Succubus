import axios, { AxiosRequestConfig } from 'axios';
import { BotKeys } from '../environments';

export class MyTinder {
  private config: AxiosRequestConfig = {
    method: 'get',
    url: 'https://api.gotinder.com',
    headers: {
      'X-Auth-Token': BotKeys.TINDER_TOKEN,
    },
  };

  constructor() {}

  public myProfile(): Promise<any> {
    this.config.url = this.config.url + '/profile'
    return axios(this.config)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }

  public applicant(): Promise<any> {
    this.config.url = this.config.url + '/user/recs'
    return axios(this.config)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }
}
