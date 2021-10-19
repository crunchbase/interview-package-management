// Package
export class Package {
  id: number;
  origin: string;
  destination: string;
  weight: number; // in kg
}

export class CreatePackageDto {
  origin: Package['origin'];
  destination: Package['destination'];
  weight: Package['weight'];
}

// Location status
export enum LocationStatusEnum {
  ARRIVED = 'arrived',
  DEPARTED = 'departed',
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
