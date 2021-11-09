import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { LocationStatusService } from './location-status.service';
import { PackageWithTracking } from './types.dto';
import { ApiHeader } from '@nestjs/swagger';

@Controller('packagesWithTracking')
export class PackagesWithTrackingController {
  constructor(
    private packageService: PackageService,
    private locationStatusService: LocationStatusService,
  ) {}

  @Get(':id')
  @ApiHeader({
    name: 'X-Employee-Id',
    description: 'Internal shipping employee id',
  })
  getPackageWithTrackingById(
    @Param('id', ParseIntPipe) id: number,
    @Headers() headers: Headers,
  ): PackageWithTracking {
    const employeeId = headers['x-employee-id'] || 'default';

    const p = this.packageService.getById(employeeId, id);

    if (!p) {
      console.log(
        `ERROR [GET /packagesWithTracking/:id] - Package with id ${id} was not found`,
      );
      throw new NotFoundException(`Package with id ${id} was not found`);
    }

    const locationStatuses = this.locationStatusService.getAllStatusesForPackage(
      p.id,
    );

    const packageWithTracking: PackageWithTracking = {
      package: p,
      tracking: locationStatuses,
    };

    console.log(
      '[GET /packagesWithTracking/:id] - Package with tracking found',
      p,
    );

    return packageWithTracking;
  }

  @ApiHeader({
    name: 'X-Employee-Id',
    description: 'Internal shipping employee id',
  })
  @Get()
  getPackagesWithTracking(@Headers() headers: Headers): PackageWithTracking[] {
    const employeeId = headers['x-employee-id'];

    if (!employeeId) {
      console.log('ERROR [POST /packages/] - Unauthorized');
      throw new UnauthorizedException();
    }

    const packagesWithTracking: PackageWithTracking[] = this.packageService
      .getAll(employeeId)
      .map(p => {
        const locationStatuses = this.locationStatusService.getAllStatusesForPackage(
          p.id,
        );

        return { package: p, tracking: locationStatuses };
      });

    console.log(
      `[GET /packages] - ${packagesWithTracking.length} Packages with tracking found`,
      packagesWithTracking,
    );

    return packagesWithTracking;
  }
}
