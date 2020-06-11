import { Injectable } from '@nestjs/common';

export interface Location extends CreateLocation {
  id: number;
}

export interface CreateLocation {
  address?: string;
}

const locations: Location[] = [
  {
    id: 0,
    address: '123 Shipping Hub Way, Oakland CA, 12345',
  },
  {
    id: 0,
    address: '456 Shipping Drop-off Road, San Francisco CA, 98765',
  },
];

@Injectable()
export class LocationService {
  public get(id: number): Location {
    return locations.find(location => location.id === id);
  }

  public create(createLocation: CreateLocation): Location {
    const { address } = createLocation;
    if (!address) {
      throw Error("Location missing required field 'address'");
    }

    const id: Location['id'] = locations.length;
    const location: Location = {
      id,
      address,
    };

    locations.push(location);

    return location;
  }
}
