import { Injectable } from '@nestjs/common';
import { Location, LocationService } from './location.service';
import { Package, PackageService } from './package.service';

export interface LocationStatus extends CreateLocationStatus {
  id: number;
  packageId: Package["id"];
}

export interface CreateLocationStatus {
  locationId?: Location['id'];
  status?: 'arrived' | 'departed';
}

const locationStatuses: LocationStatus[] = [
  {
    id: 0,
    packageId: 0,
    locationId: 0,
    status: 'arrived',
  },
  {
    id: 1,
    packageId: 0,
    locationId: 1,
    status: 'arrived',
  },
  {
    id: 2,
    packageId: 0,
    locationId: 1,
    status: 'departed',
  },
];

@Injectable()
export class LocationStatusService {
  constructor(private packageService: PackageService, private locationService: LocationService) {}

  public get(id: number): LocationStatus | undefined {
    return locationStatuses.find(status => status.id === id);
  }

  public getAllStatusesForPackage(packageId: Package["id"]): LocationStatus[] {
    return locationStatuses.filter(status => status.packageId === packageId);
  }

  public create(packageId: Package["id"], createLocationStatus: CreateLocationStatus): LocationStatus {
    const { locationId, status } = createLocationStatus;

    if (!locationId) {
      throw Error("Location status missing required field 'locationId'");
    }

    if (!status) {
      throw Error("Location status missing required field 'status'");
    }

    const location = this.locationService.get(locationId);
    if (!location) {
      throw Error("Location matching 'locationId' not found");
    }

    const id: LocationStatus['id'] = locationStatuses.length;
    const locationStatus: LocationStatus = {
      id,
      packageId,
      locationId,
      status,
    };

    locationStatuses.push(locationStatus);

    return locationStatus;
  }
}
