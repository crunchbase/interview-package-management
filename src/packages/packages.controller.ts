import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePackage, Package, PackageService } from './package.service';
import {
  CreateLocationStatus,
  LocationStatus,
  LocationStatusService,
} from './location-status.service';

@Controller('packages')
export class PackagesController {
  constructor(
    private packageService: PackageService,
    private locationStatusService: LocationStatusService,
  ) {}

  @Get(':id')
  getPackage(@Param() params): Package {
    const id: Package["id"] = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Package id malformed');
    }

    const p = this.packageService.get(id);

    if (!p) {
      throw new NotFoundException(`Package with id ${ id } was not found`);
    }

    return p;
  }

  @Post()
  createPackage(
    @Body() createPackage: CreatePackage,
    @Headers() headers: Headers,
  ): Package {
    if (!headers['x-is-internal']) {
      throw new UnauthorizedException();
    }

    // 'pack' here because 'package' is a reserved word
    let pack: Package;
    try {
      pack = this.packageService.create(createPackage);
    } catch (e) {
      console.log("Create package error", e);
      throw new BadRequestException('Package missing required fields');
    }

    return pack;
  }

  @Post(':id/locationStatuses')
  createLocationStatus(
    @Body() createLocationStatus: CreateLocationStatus,
    @Headers() headers: Headers,
    @Param() params
  ): LocationStatus {
    if (!headers['x-is-internal']) {
      throw new UnauthorizedException();
    }

    const packageId: Package["id"] = parseInt(params.id, 10);
    if (isNaN(packageId)) {
      throw new BadRequestException('Package id malformed');
    }

    const pack = this.packageService.get(packageId);

    if (!pack) {
      throw new NotFoundException(`Package with id ${ packageId } was not found`);
    }

    let locationStatus: LocationStatus;
    try {
      locationStatus = this.locationStatusService.create(packageId, createLocationStatus);
    } catch (e) {
      console.log("Create location status error", e);
      throw new BadRequestException(`Location status missing required fields`);
    }

    return locationStatus;
  }
}
