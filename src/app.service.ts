import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DbService } from './shared';

@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}
  async getHello(): Promise<string> {
    const result = await this.db.create('vitalikWatchlist', ['matic-network']);
    return `Hello Wold! ${JSON.stringify(result)}`;
  }

  async getAggregateBalance(address: string) {
    const apiKey = 'ckey_c0cb6e86390f40ef872c5a783e8';
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${apiKey}`);
    return response.data;
  }
}
