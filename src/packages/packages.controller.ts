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
  Patch,
} from '@nestjs/common';
import { Package, LocationStatus, LocationStatusEnum } from './types';
import { packagesData, locationsData } from './data';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageLocationDto } from './dto/update-package-location.dto';

@Controller('packages')
export class PackagesController {
  @Get(':id')
  findById(@Param() params): Package {
    const p: Package = packagesData.find(p => p.id === parseInt(params.id, 10));

    if (p) {
      return p;
    }

    throw new NotFoundException('package with id was not found');
  }

  @Post()
  create(
    @Body() createPackageDto: CreatePackageDto,
    @Headers() headers: Headers,
  ): Package {
    if (!headers['x-is-internal']) {
      throw new UnauthorizedException();
    }

    if (
      createPackageDto.height === undefined ||
      createPackageDto.width === undefined ||
      createPackageDto.length === undefined
    ) {
      throw new BadRequestException('package missing required dimensions');
    }

    const originLocation = locationsData.find(location => {
      return location.id === createPackageDto.originLocationId;
    });

    if (!originLocation) {
      throw new BadRequestException('orgin location not found');
    }

    const locationStatus: LocationStatus = {
      locationId: createPackageDto.originLocationId,
      status: LocationStatusEnum.SCANNED,
    };

    const p = {
      id: packagesData.length,
      dimensions: {
        height: createPackageDto.height,
        width: createPackageDto.width,
        length: createPackageDto.length,
      },
      locationStatuses: [locationStatus],
    };

    packagesData.push(p);

    return p;
  }

  @Patch(':id/locationStatues')
  addLocation(
    @Param() params,
    @Body() updatePackageLocationDto: UpdatePackageLocationDto,
    @Headers() headers: Headers,
  ): Package {
    if (!headers['x-is-internal']) {
      throw new UnauthorizedException();
    }

    if (
      updatePackageLocationDto.locationId === undefined ||
      params.id === undefined ||
      updatePackageLocationDto.status === undefined
    ) {
      throw new BadRequestException('missing required properties');
    }

    const location = locationsData.find(location => {
      return location.id === updatePackageLocationDto.locationId;
    });

    if (!location) {
      throw new BadRequestException('location id is invalid');
    }

    const p = packagesData.find(p => {
      return p.id === parseInt(params.id, 10);
    });

    if (!p) {
      throw new BadRequestException('package id is invalid');
    }

    const locationStatus: LocationStatus = {
      locationId: location.id,
      status: updatePackageLocationDto.status,
    };

    p.locationStatuses.push(locationStatus);

    return p;
  }
}
