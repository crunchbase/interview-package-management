import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  ParseIntPipe,
  BadRequestException,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { LocationStatusService } from './location-status.service';
import {
  CreateLocationStatusDto,
  CreatePackageDto,
  LocationStatus,
  Package,
} from './types.dto';
import { ApiHeader } from '@nestjs/swagger';

@Controller('packages')
export class PackagesController {
  constructor(
    private packageService: PackageService,
    private locationStatusService: LocationStatusService,
  ) {}

  @Get(':id')
  getPackageById(@Param('id', ParseIntPipe) id: number): Package {
    const p = this.packageService.getById(id);

    if (!p) {
      console.log(
        `ERROR [GET /packages/:id] - Package with id ${id} was not found`,
      );
      throw new NotFoundException(`Package with id ${id} was not found`);
    }

    console.log('[GET /packages/:id] - Package found', p);

    return p;
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Get()
  getPackages(@Headers() headers: Headers): Package[] {
    if (!headers['x-is-employee']) {
      console.log('ERROR [POST /packages/] - Unauthorized');
      throw new UnauthorizedException();
    }

    const packages = this.packageService.getAll();

    console.log(
      `[GET /packages] - ${packages.length} Packages found`,
      packages,
    );

    return packages;
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Post()
  createPackage(
    @Headers() headers: Headers,
    @Body() createPackageDto: CreatePackageDto,
  ): Package {
    if (!headers['x-is-employee']) {
      console.log('ERROR [POST /packages/] - Unauthorized');
      throw new UnauthorizedException();
    }

    let pack: Package;
    try {
      pack = this.packageService.create(createPackageDto);
    } catch (e) {
      console.log('ERROR [POST /packages/] - Create package error', e);
      throw new BadRequestException('Package missing required fields');
    }

    console.log('[POST /packages/] - Package created', pack);

    return pack;
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Get(':id/locationStatuses')
  getLocationStatuses(
    @Headers() headers: Headers,
    @Param('id', ParseIntPipe) packageId: number,
  ): LocationStatus[] {
    if (!headers['x-is-employee']) {
      console.log('ERROR [GET /packages/:id/locationStatuses] - Unauthorized');
      throw new UnauthorizedException();
    }

    const pack = this.packageService.getById(packageId);

    if (!pack) {
      console.log(
        `ERROR [GET /packages/:id/locationStatuses] - Package with id ${packageId} not found`,
      );
      throw new NotFoundException(`Package with id ${packageId} was not found`);
    }

    const locationStatuses = this.locationStatusService.getAllStatusesForPackage(
      packageId,
    );

    console.log(
      `[GET /packages/:id/locationStatuses] - Package ${packageId} location statuses found`,
      locationStatuses,
    );

    return locationStatuses;
  }

  @ApiHeader({
    name: 'X-Is-Employee',
    description: 'Internal shipping employee header',
  })
  @Post(':id/locationStatuses')
  createLocationStatus(
    @Body() createLocationStatusDto: CreateLocationStatusDto,
    @Headers() headers: Headers,
    @Param('id', ParseIntPipe) packageId: number,
  ): LocationStatus {
    if (!headers['x-is-employee']) {
      console.log('ERROR [POST /packages/:id/locationStatuses] - Unauthorized');
      throw new UnauthorizedException();
    }

    const pack = this.packageService.getById(packageId);

    if (!pack) {
      console.log(
        `ERROR [POST /packages/:id/locationStatuses] - Package with id ${packageId} not found`,
      );
      throw new NotFoundException(`Package with id ${packageId} was not found`);
    }

    let locationStatus: LocationStatus;
    try {
      locationStatus = this.locationStatusService.create(
        packageId,
        createLocationStatusDto,
      );
    } catch (e) {
      console.log(
        'ERROR [POST /packages/:id/locationStatuses] - Create location status error',
        e,
      );
      throw new BadRequestException(`Location status missing required fields`);
    }

    console.log(
      '[POST /packages/:id/locationStatuses] - Package location updated',
      locationStatus,
    );

    return locationStatus;
  }
}
