import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { LocationStatusService } from './location-status.service';
import { PackageService } from './package.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController, PackagesController],
  providers: [LocationStatusService, PackageService],
})
export class AppModule {}
