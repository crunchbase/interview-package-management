export interface Location {
    id: number;
    name?: string;
    coordinates: [number, number];
    address: string; // for simplicity
}

export enum LocationStatusEnum {
    SCANNED = "scanned",
    ARRIVED = "arrived",
    DEPARTED = "departed",
    DELIVERED = "delivered"
}

export interface LocationStatus {
    locationId: number;
    status: LocationStatusEnum;
}

export interface Package {
    id: number;
    dimensions: { // sizes in cm
        height: number;
        width: number;
        length: number;
    };
    locationStatuses: LocationStatus[];
}