import { TOutputFilter, IListResponse } from '@via-profit-services/core';
import { Context, VehicleMake, VehicleModel } from './types';
interface IProps {
    context: Context;
}
declare class Vehicles {
    props: IProps;
    constructor(props: IProps);
    getVehacleMakes(filter: Partial<TOutputFilter>): Promise<IListResponse<VehicleMake>>;
    getVehacleModels(filter: Partial<TOutputFilter>): Promise<IListResponse<VehicleModel>>;
    getVehacleMakesByIds(ids: string[]): Promise<VehicleMake[]>;
    getVehacleModelsByIds(ids: string[]): Promise<VehicleModel[]>;
    getVehicleMake(id: string): Promise<VehicleMake | false>;
    getVehicleModel(id: string): Promise<VehicleModel | false>;
}
export default Vehicles;
export { Vehicles };
