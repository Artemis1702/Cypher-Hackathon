import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';


@Controller('bal')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('address')
  getBalance() {
    return this.balanceService.getAggregateBalance();
  }
}
