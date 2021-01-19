import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { LocationStatusService } from './location-status.service';
import { PackageService } from './package.service';

@Module({
  imports: [],
  controllers: [PackagesController],
  providers: [LocationStatusService, PackageService],
})
export class AppModule {}
