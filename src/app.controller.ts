import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/favicon.ico')
  favico() {
    throw new NotFoundException();
  }
}
