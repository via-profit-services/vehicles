import { Middleware, collateForDataloader, Node } from '@via-profit-services/core';
import { VehiclesMiddlewareFactory } from '@via-profit-services/vehicles';
import DataLoader from '@via-profit/dataloader';

import VehiclesService from './VehiclesService';

const vehiclesFactory: VehiclesMiddlewareFactory = () => {
  const middleware: Middleware = ({ context }) => {

    // Vehicle Service
    context.services.vehicles = new VehiclesService({ context });

    context.dataloader.vehicles = {
      // Brands dataloader
      brands: new DataLoader((ids: string[]) => context.services.vehicles.getBrandsByIds(ids)
        .then((nodes) => collateForDataloader(ids, nodes)), {
          redis: context.redis,
          defaultExpiration: '1d',
          cacheName: 'vehicles.brands',
        }),

      // Models dataloader
      models: new DataLoader((ids: string[]) => context.services.vehicles.getModelsByIds(ids)
        .then((nodes) => collateForDataloader(ids, nodes)), {
          redis: context.redis,
          defaultExpiration: '1d',
          cacheName: 'vehicles.models',
        }),
    };

    return {
      context,
    };
  }

  return middleware
};

export default vehiclesFactory;