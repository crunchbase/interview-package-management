import { Injectable } from '@nestjs/common';

export interface CreatePackage {
  weight?: number; // in kg
  height?: number; // in cm
  width?: number; // in cm
  length?: number; // in cm
}

export interface Package extends CreatePackage {
  id: number;
}

const packages: Package[] = [
  {
    id: 0,
    weight: 20,
    height: 35,
    width: 50,
    length: 50,
  },
  {
    id: 1,
    weight: 1.5,
    height: 6,
    width: 6,
    length: 80,
  },
  {
    id: 2,
    weight: 5,
    height: 25,
    width: 25,
    length: 25,
  },
];

@Injectable()
export class PackageService {
  public get(id: number): Package {
    return packages.find(p => p.id === id);
  }

  public create(createPackage: CreatePackage): Package {
    const { weight, height, width, length } = createPackage;
    if (!weight) {
      throw Error("Package missing required field 'weight'");
    }

    if (!height) {
      throw Error("Package missing required field 'height'");
    }

    if (!width) {
      throw Error("Package missing required field 'width'");
    }

    if (!length) {
      throw Error("Package missing required field 'length'");
    }

    const id: Package['id'] = packages.length;

    // 'pack' here because 'package' is a reserved word
    const pack: Package = {
      id,
      weight,
      height,
      width,
      length,
    };

    packages.push(pack);

    return pack;
  }
}
