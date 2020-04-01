import { LocationStatusEnum } from "../types";

export interface UpdatePackageLocationDto {
    locationId: number;
    status: LocationStatusEnum;
}