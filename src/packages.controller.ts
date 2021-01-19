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
import { PackageService } from './package.service';
import { LocationStatusService } from './location-status.service';
import {
  CreateLocationStatusDto,
  CreatePackageDto,
  LocationStatus,
  Package,
  PackageWithTracking,
} from './types.dto';
import { ApiHeader } from '@nestjs/swagger';

@Controller('packages')
export class PackagesController {
  constructor(
    private packageService: PackageService,
    private locationStatusService: LocationStatusService,
  ) {}

  @Get(':id')
  getPackage(@Param() params): PackageWithTracking {
    const id: Package['id'] = parseInt(params.id, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Package id malformed');
    }

    const p = this.packageService.get(id);

    if (!p) {
      throw new NotFoundException(`Package with id ${id} was not found`);
    }

    const locationStatuses = this.locationStatusService.getAllStatusesForPackage(
      p.id,
    );

    return {
      package: p,
      locationStatuses,
    };
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Post()
  createPackage(
    @Body() createPackageDto: CreatePackageDto,
    @Headers() headers: Headers,
  ): Package {
    if (!headers['x-is-employee']) {
      throw new UnauthorizedException();
    }

    // 'pack' here because 'package' is a reserved word
    let pack: Package;
    try {
      pack = this.packageService.create(createPackageDto);
    } catch (e) {
      console.log('Create package error', e);
      throw new BadRequestException('Package missing required fields');
    }

    return pack;
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Post(':id/locationStatuses')
  createLocationStatus(
    @Body() createLocationStatusDto: CreateLocationStatusDto,
    @Headers() headers: Headers,
    @Param() params,
  ): LocationStatus {
    if (!headers['x-is-employee']) {
      throw new UnauthorizedException();
    }

    const packageId: Package['id'] = parseInt(params.id, 10);
    if (isNaN(packageId)) {
      throw new BadRequestException('Package id malformed');
    }

    const pack = this.packageService.get(packageId);

    if (!pack) {
      throw new NotFoundException(`Package with id ${packageId} was not found`);
    }

    let locationStatus: LocationStatus;
    try {
      locationStatus = this.locationStatusService.create(
        packageId,
        createLocationStatusDto,
      );
    } catch (e) {
      console.log('Create location status error', e);
      throw new BadRequestException(`Location status missing required fields`);
    }

    return locationStatus;
  }
}
