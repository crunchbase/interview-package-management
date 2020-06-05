
import { Location, Package, LocationStatus, LocationStatusEnum } from "./types";

export const locationsData: Location[] = [
    {
        id: 0,
        name: "Oakland Shipping Hub",
        coordinates: [1.00, 1.50],
        address: "123 Front Street"
    },
    {
        id: 1,
        name: "Your Local Post Office",
        coordinates: [1.00, 1.51],
        address: "456 Main Lane"
    },
    {
        id: 2,
        coordinates: [0.1, 0.2],
        address: "780 Your House"
    }
];

export const locationStatuses: LocationStatus[] = [
    {
        locationId: 0,
        status: LocationStatusEnum.SCANNED
    },
    {
        locationId: 0,
        status: LocationStatusEnum.DEPARTED
    },
    {
        locationId: 1,
        status: LocationStatusEnum.ARRIVED
    },
    {
        locationId: 1,
        status: LocationStatusEnum.DEPARTED
    },
    {
        locationId: 2,
        status: LocationStatusEnum.DELIVERED
    },
];

export const packagesData: Package[] = [
    {
        id: 1,
        dimensions: {
            height: 10,
            width: 10,
            length: 10
        },
        locationStatuses: locationStatuses
    }
];