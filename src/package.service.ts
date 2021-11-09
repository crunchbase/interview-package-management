import { Injectable } from '@nestjs/common';
import { CreatePackageDto, Package } from './types.dto';

const packages: { [employeeId: string]: Package[] } = {
  default: [
    {
      id: 123,
      origin: '1 My Place, Oakland, CA, 11111',
      destination: "9 Cool Friend's House, New York City, NY, 99999",
      weight: 20,
    },
    {
      id: 456,
      origin: "9 Cool Friend's House, New York City, NY, 99999",
      destination: 'PO BOX 9, New York City, NY, 99999',
      weight: 1.5,
    },
    {
      id: 789,
      origin: '2 Cookie Factory Lane, Houston, TX, 22222',
      destination: '1 My Place, Oakland, CA, 11111',
      weight: 5,
    },
  ],
};

@Injectable()
export class PackageService {
  public getAll(employeeId: string): Package[] {
    return packages[employeeId] || [];
  }

  public getById(employeeId: string, id: number): Package | undefined {
    return packages[employeeId]?.find(p => p.id === id);
  }

  public create(
    employeeId: string,
    createPackageDto: CreatePackageDto,
  ): Package {
    const { origin, destination, weight } = createPackageDto;
    if (!weight) {
      throw Error("Package missing required field 'weight'");
    }

    if (!origin) {
      throw Error("Package missing required field 'origin'");
    }

    if (!destination) {
      throw Error("Package missing required field 'destination'");
    }

    const id: Package['id'] = Math.floor(Math.random() * 1000);

    // 'pack' here because 'package' is a reserved word
    const pack: Package = {
      id,
      origin,
      destination,
      weight,
    };

    if (!packages[employeeId]) {
      packages[employeeId] = [];
    }

    packages[employeeId].push(pack);

    return pack;
  }
}
