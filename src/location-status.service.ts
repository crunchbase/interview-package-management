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
    id: 0,
    packageId: 0,
    address: '456 Shipping Drop-off Road, San Francisco CA, 98765',
    status: LocationStatusEnum.ARRIVED,
  },
  {
    id: 1,
    packageId: 0,
    address: '123 Shipping Hub Way, Oakland CA, 12345',
    status: LocationStatusEnum.DEPARTED,
  },
  {
    id: 2,
    packageId: 0,
    address: '123 Shipping Hub Way, Oakland CA, 12345',
    status: LocationStatusEnum.ARRIVED,
  },
  {
    id: 3,
    packageId: 1,
    address: '123 Shipping Hub Way, Oakland CA, 12345',
    status: LocationStatusEnum.DEPARTED,
  },
  {
    id: 4,
    packageId: 2,
    address: '123 Shipping Hub Way, Oakland CA, 12345',
    status: LocationStatusEnum.DEPARTED,
  },
];

@Injectable()
export class LocationStatusService {
  public get(id: number): LocationStatus | undefined {
    const storedLocationStatus = storedLocationStatuses.find(
      status => status.id === id,
    );

    if (!storedLocationStatus) {
      return undefined;
    }

    const { id: locationStatusId, address, status } = storedLocationStatus;
    return {
      id: locationStatusId,
      address,
      status,
    };
  }

  public getAllStatusesForPackage(packageId: Package['id']): LocationStatus[] {
    return storedLocationStatuses
      .filter(status => status.packageId === packageId)
      .map(storedLocationStatus => {
        const { id, address, status } = storedLocationStatus;
        return {
          id,
          address,
          status,
        };
      });
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
    const locationStatus: StoredLocationStatus = {
      id,
      packageId,
      address,
      status,
    };

    storedLocationStatuses.push(locationStatus);

    return {
      id,
      address,
      status,
    };
  }
}
