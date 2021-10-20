import { Injectable } from '@nestjs/common';
import {
  CreateLocationStatusDto,
  LocationStatus,
  LocationStatusEnum,
  Package,
} from './types.dto';

export class StoredLocationStatus {
  id: LocationStatus['id'];
  packageId: Package['id'];
  address: LocationStatus['address'];
  status: LocationStatus['status'];
  timestamp: number;
}

const storedLocationStatuses: StoredLocationStatus[] = [
  {
    id: 1011,
    packageId: 123,
    address: '1 Package Dropoff Way, Oakland, CA, 11111',
    status: LocationStatusEnum.ARRIVED,
    timestamp: 1617998101873,
  },
  {
    id: 1213,
    packageId: 123,
    address: '1 Package Dropoff Way, Oakland, CA, 11111',
    status: LocationStatusEnum.DEPARTED,
    timestamp: 1618998101873,
  },
  {
    id: 1415,
    packageId: 123,
    address: '4 Midway Street, Columbus, OH, 44444',
    status: LocationStatusEnum.ARRIVED,
    timestamp: 1619998101873,
  },
];

@Injectable()
export class LocationStatusService {
  public getAllStatusesForPackage(packageId: Package['id']): LocationStatus[] {
    const statusesForPackages = storedLocationStatuses
      .filter(status => status.packageId === packageId)
      .map(storedLocationStatus => {
        const { id, address, status, timestamp } = storedLocationStatus;
        return {
          id,
          address,
          status,
          createdAt: new Date(timestamp).toString(),
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
      throw Error("Location status missing required field 'address'");
    }

    if (!status) {
      throw Error("Location status missing required field 'status'");
    }

    const id = storedLocationStatuses.length;
    const timestamp = Date.now();

    const locationStatus: LocationStatus = {
      id,
      address,
      status,
      createdAt: new Date(timestamp).toString(),
    };

    storedLocationStatuses.push({
      ...locationStatus,
      packageId,
      timestamp,
    });

    return locationStatus;
  }
}
