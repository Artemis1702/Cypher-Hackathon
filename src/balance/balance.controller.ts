import { Controller, Get, HttpException, HttpStatus,  } from '@nestjs/common';
import { BalanceService } from './balance.service';


@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('address')
  async getBalance() {
    try {
      const balance = await this.balanceService.getAggregateBalance();
      return { data: balance };
    } catch (e) {
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
