import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    const host = req.get('Host');
    return this.appService.getHello() + host;
  }
}
