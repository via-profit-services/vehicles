import {
  DataLoader, collateForDataloader, Node,
} from '@via-profit-services/core';

import VehiclesService from './service';

import {
  Context, VehicleMake, VehicleModel,
} from './types';

interface ILoaders {
  makes: DataLoader<string, VehicleMake>;
  models: DataLoader<string, VehicleModel>;
}

const loaders: ILoaders = {
  makes: null,
  models: null,
};

export default function createILoaders(context: Context): ILoaders {
  if (loaders.makes !== null && loaders.models !== null) {
    return loaders;
  }

  const service = new VehiclesService({ context });

  loaders.makes = new DataLoader(async (ids: string[]) => {
    const nodes = await service.getVehacleMakesByIds(ids);

    return collateForDataloader(ids, (nodes as Node<VehicleMake>[]));
  });

  loaders.models = new DataLoader(async (ids: string[]) => {
    const nodes = await service.getVehacleModelsByIds(ids);

    return collateForDataloader(ids, (nodes as Node<VehicleModel>[]));
  });

  return loaders;
}
