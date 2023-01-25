import { Injectable } from '@nestjs/common';
// import  Web3  from 'web3';

import axios from 'axios';

@Injectable()
export class BalanceService {
  async getAggregateBalance() {
    // const apiKey = 'ckey_c0cb6e86390f40ef872c5a783e8';
    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/0x52114fb7396dbe19096ffa343d18830f5d77b6c6/balances_v2/?key=key_c0cb6e86390f40ef872c5a783e8`);
    return response.data;
  }
}
