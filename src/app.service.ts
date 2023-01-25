import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DbService } from './shared';

@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}

  private masterCoinList: { id: string, symbol: string, name: string }[] = [];

  async getHello(): Promise<string> {
    const result = await this.db.create('vitalikWatchlist', ['matic-network']);
    return `Hello Wold! ${JSON.stringify(result)}`;
  }

  async getAggregateBalance(address: string) {
    const apiKey = 'ckey_c0cb6e86390f40ef872c5a783e8';
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${apiKey}`);
    return response.data;
  }

  async getMasterCoinList() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      const coins = response.data;
      this.masterCoinList = response.data.map((coin: { id: any; symbol: any; name: any; }) => {
        return { id: coin.id, symbol: coin.symbol, name: coin.name };
      });
      return this.masterCoinList;
    } catch (error) {
      throw new Error("Error");
    }
  }

  createWatchlist(name: string) {
    if(!name.match(/^[a-zA-Z0-9]+$/) || name.length < 5 || name.length > 20) {
      throw new Error('Invalid name. Name should be alphanumeric with minimum of 5 characters and maximum of 20');
    }
    this.db.create(name, []);
  }

  addTokensToWatchlist(name:string, tokens:string[]) {
    const watchlist = this.db.find(name);
    if(!watchlist) {
      throw new Error(`Watchlist ${name} not found`);
    }
    for(let token of tokens) {
      if(!this.masterCoinList.find(coin => coin.id === token)) {
        throw new Error(`Token ${token} is not present in the Master Coin List`);
      }
    }
    this.db.update(name,tokens);
    return watchlist;
  }
  
}
