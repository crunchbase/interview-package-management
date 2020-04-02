import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
import { packages, locations } from './data';

@Controller('packages')
export class PackagesController {
  @Get(':id')
  findById(@Param() params): any {
    console.log(`INFO: GET ${params.id} ===== START`);

    const p = packages.find(p => {
      return p.id === parseInt(params.id, 10);
    });

    if (!p) {
      console.log("ERROR: GET ${params.id}/locations -- package not found");
      console.log(`INFO: GET ${params.id} ===== END`);
      throw new NotFoundException("Package not found");
    }

    console.log(`INFO: GET ${params.id} -- package found`, p);

    console.log(`INFO: GET ${params.id} ===== END`);

    return p;
  }

  @Post()
  create(@Body() packageData: any, @Headers() headers: Headers): any {
    console.log(`INFO: POST / ===== START`);

    if (!headers['x-is-internal']) {
      console.log(`ERROR: POST / -- called without proper headers`)
    }

    const p = {
      id: packages.length,
      ...packageData,
    };

    console.log(`INFO: POST / -- package created`, p);

    packages.push(p);

    console.log(`INFO: POST / -- packages list`, packages);

    console.log(`INFO: POST / ===== END`);

    return p;
  }

  @Post(':id/locations')
  createLocation(
    @Param() params,
    @Body() locationData: any,
  ): any {
    console.log(`INFO: POST ${params.id}/locations ===== START`);

    const p = packages.find(p => {
      return p.id === parseInt(params.id, 10);
    });

    if (!p) {
      console.log(`ERROR: POST ${params.id}/locations -- package not found`);
      console.log(`INFO: POST ${params.id}/locations ===== END`);
      throw new NotFoundException("Package not found");
    }

    console.log(`INFO: POST ${params.id}/locations -- package found`, p);

    const location = {
      id: locations.length,
      packageId: p.id,
      ...locationData,
    };

    console.log(`INFO: POST ${params.id}/locations -- location created`, location);

    locations.push(location);

    console.log(`INFO: POST ${params.id}/locations -- locations list`, locations);

    console.log(`INFO: POST ${params.id}/locations ===== END`);

    return location;
  }

  @Get(':id/locations')
  getLocations(@Param() params, @Headers() headers: Headers): any {
    console.log(`INFO: GET ${params.id}/locations ===== START`);

    if (!headers['x-is-internal']) {
      console.log(`ERROR: GET ${params.id}/locations -- called without proper headers`)
    }

    const p = packages.find(p => {
      return p.id === parseInt(params.id, 10);
    });

    if (!p) {
      console.log("INFO: GET ${params.id}/locations -- package not found");
      console.log(`INFO: GET ${params.id}/locations ===== END`);
      throw new NotFoundException("Package not found");
    }

    console.log(`INFO: GET ${params.id}/locations -- package found`, p);

    const l = locations.filter(l => l.packageId === p.id);
    console.log(`INFO: GET ${params.id}/locations -- locations`, l);

    console.log(`INFO: GET ${params.id}/locations ===== END`);

    return l;
  }
}
