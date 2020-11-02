import axios, { AxiosRequestConfig } from 'axios';
import { BotKeys } from '../environments';

export class MyTinder {
  private config: AxiosRequestConfig = {
    method: 'get',
    baseURL: 'https://api.gotinder.com',
    headers: {
      'X-Auth-Token': BotKeys.TINDER_TOKEN,
    },
  };

  constructor() {}

  public myProfile(): Promise<any> {
    const body: AxiosRequestConfig = this.config;
    body.url = '/profile';
    return axios(body)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }

  public applicant(): Promise<any> {
    const body: AxiosRequestConfig = this.config;
    body.url = '/user/recs';
    return axios(body)
      .then((response) => response.data)
      .catch(error => console.log(error));
  }
}
