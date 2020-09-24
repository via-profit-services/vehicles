import { DataLoader } from '@via-profit-services/core';
import { Context, VehicleMake, VehicleModel } from './types';
interface ILoaders {
    makes: DataLoader<string, VehicleMake>;
    models: DataLoader<string, VehicleModel>;
}
export default function createILoaders(context: Context): ILoaders;
export {};
