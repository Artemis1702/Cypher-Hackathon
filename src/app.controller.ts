import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Get(':address')
  async getBalance(@Param('address') address: string) {
    try {
      const balance = await this.appService.getAggregateBalance(address);
      const ethereum = balance.data.items.find((item: { contract_name: string; }) => item.contract_name === 'Ether');
      const fantom: never[] = []
      const polygon: never[] = []
      const balances = {ethereum, fantom, polygon}
      const balleft = balance.data.items.map((item: { balance: any; }) => item.balance);
      return { address,balances, balleft };
    } catch (error) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
