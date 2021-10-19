import { Injectable } from '@nestjs/common';
import {
  CreateLocationStatusDto,
  LocationStatus,
  LocationStatusEnum,
  Package,
} from './types.dto';

export class StoredLocationStatus {
  id: number;
  packageId: Package['id'];
  address: LocationStatus['address'];
  status: LocationStatus['status'];
}

const storedLocationStatuses: StoredLocationStatus[] = [
  {
    id: 1011,
    packageId: 456,
    address: '1 Package Dropoff Way, Oakland, CA, 11111',
    status: LocationStatusEnum.ARRIVED,
  },
  {
    id: 1213,
    packageId: 456,
    address: '1 Package Dropoff Way, Oakland, CA, 11111',
    status: LocationStatusEnum.DEPARTED,
  },
  {
    id: 1415,
    packageId: 456,
    address: '4 Midway Street, Columbus, OH, 44444',
    status: LocationStatusEnum.ARRIVED,
  },
];

@Injectable()
export class LocationStatusService {
  public getAllStatusesForPackage(packageId: Package['id']): LocationStatus[] {
    const statusesForPackages = storedLocationStatuses
      .filter(status => status.packageId === packageId)
      .map(storedLocationStatus => {
        const { id, address, status } = storedLocationStatus;
        return {
          id,
          address,
          status,
        };
      });

    return statusesForPackages;
  }

  public create(
    packageId: Package['id'],
    createLocationStatusDto: CreateLocationStatusDto,
  ): LocationStatus {
    const { address, status } = createLocationStatusDto;

    if (!address) {
      throw Error(
        "Location status missing required field 'address'",
      );
    }

    if (!status) {
      throw Error(
        "Location status missing required field 'status'",
      );
    }

    const id = storedLocationStatuses.length;
    const locationStatus = {
      id,
      address,
      status,
    };

    storedLocationStatuses.push({ ...locationStatus, packageId });

    return locationStatus;
  }
}
