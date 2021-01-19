// Package
export class Package {
  id: number;
  weight: number; // in kg
  height: number; // in cm
  width: number; // in cm
  length: number; // in cm
}

export class CreatePackageDto {
  weight: Package['weight']; // in kg
  height: Package['height']; // in cm
  width: Package['width']; // in cm
  length: Package['length']; // in cm
}

// Location status
export enum LocationStatusEnum {
  ARRIVED = 'arrived',
  DEPARTED = 'departed'
}

export class LocationStatus {
  id: number;
  address: string;
  status: LocationStatusEnum;
}

export class CreateLocationStatusDto {
  address: LocationStatus['address'];
  status: LocationStatus['status'];
}

export class PackageWithTracking {
  package: Package;
  locationStatuses: LocationStatus[];
}
