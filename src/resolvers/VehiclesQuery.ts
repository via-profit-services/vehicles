import {
  buildCursorConnection,
  ServerError,
  buildQueryFilter,
  CursorConnection,
} from '@via-profit-services/core';
import { Resolvers, VehicleSearchProps } from '@via-profit-services/vehicles';

const vehiclesQuery: Resolvers['VehiclesQuery'] = {
  brands: async (_parent, args, context) => {
    const { services, dataloader } = context;
    const filter = buildQueryFilter(args);

    try {
      const brandsConnection = await services.vehicles.getBrands(filter);
      const connection = buildCursorConnection(brandsConnection, 'vehicle-brands');
      await dataloader.vehicles.brands.primeMany(brandsConnection.nodes);

      return connection;
    } catch (err) {
      throw new ServerError('Failed to get vehicles brands list', { err });
    }
  },
  models: async (_parent, args, context) => {
    const { services, dataloader } = context;
    const filter = buildQueryFilter(args);

    try {
      const brandsConnection = await services.vehicles.getModels(filter);
      const connection = buildCursorConnection(brandsConnection, 'vehicle-models');
      await dataloader.vehicles.models.primeMany(brandsConnection.nodes);

      return connection;
    } catch (err) {
      throw new ServerError('Failed to get vehicles brands list', { err });
    }
  },
  brand: async (_parent, args, context) => {
    const { dataloader } = context;
    const { id } = args;
    const brand = await dataloader.vehicles.brands.load(id);

    return brand;
  },
  model: async (_parent, args, context) => {
    const { dataloader } = context;
    const { id } = args;
    const model = await dataloader.vehicles.models.load(id);

    return model;
  },

  search: async (_parent, args, context) => {
    const { services } = context;
    try {
      const searchData = await services.vehicles.searchBrandModel(args);

      return searchData;
      args;
    } catch (err) {
      throw new ServerError('Failed to search', { err });
    }
  },
};

export default vehiclesQuery;
