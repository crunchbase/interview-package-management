import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagesController } from './packages/packages.controller';

@Module({
  imports: [],
  controllers: [AppController, PackagesController],
  providers: [AppService],
})
export class AppModule {}
