import { IResolvers } from '@via-profit-services/core';

import createLoaders from '../loaders';
import { Context } from '../types';
import VehicleMake from './VehicleMake';
import VehicleModel from './VehicleModel';
import VehicleMakesListConnection from './VehicleMakesListConnection';
import VehicleModelsListConnection from './VehicleModelsListConnection';


const resolvers: IResolvers<any, Context> = {
  Query: {
    vehicles: () => ({}),
  },
  VehiclesQuery: {
    makes: VehicleMakesListConnection,
    models: VehicleModelsListConnection,
    make: async (parent: {id?: string}, args: {id?: string}, context) => {
      const loaders = createLoaders(context);
      const make = await loaders.makes.load(parent?.id || args?.id);

      return make || null;
    },
    model: async (parent: {id?: string}, args: {id?: string}, context) => {
      const loaders = createLoaders(context);
      const model = await loaders.models.load(parent?.id || args?.id);

      return model || null;
    },
  },
  VehicleMake,
  VehicleModel,
};

export default resolvers;
