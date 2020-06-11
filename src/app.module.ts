import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagesController } from './packages/packages.controller';
import { LocationService } from './packages/location.service';
import { LocationStatusService } from './packages/location-status.service';
import { PackageService } from './packages/package.service';

@Module({
  imports: [],
  controllers: [AppController, PackagesController],
  providers: [
    AppService,
    LocationService,
    LocationStatusService,
    PackageService,
  ],
})
export class AppModule {}
