import axios, { AxiosRequestConfig } from 'axios';
import { BotKeys } from '../environments';

export class MyTinder {
  private config: AxiosRequestConfig = {
    method: 'get',
    url: 'https://api.gotinder.com/profile',
    headers: {
      'X-Auth-Token': BotKeys.TINDER_TOKEN,
    },
  };

  constructor() {}

  public myProfile(): Promise<any> {
    return axios(this.config)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }
}
