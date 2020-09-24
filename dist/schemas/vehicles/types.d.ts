import { IContext } from '@via-profit-services/core';
export declare type Context = Pick<IContext, 'knex' | 'timezone' | 'logger'>;
export interface VehicleMake {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface VehicleModel {
    id: string;
    name: string;
    make: {
        id: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare type VehicleMakeInput = Omit<VehicleMake, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type VehicleMakeOutput = VehicleMake;
export declare type VehicleModelInput = Omit<VehicleModel, 'id' | 'make' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    make: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type VehicleModelOutput = Omit<VehicleModel, 'make'> & {
    make: string;
};
