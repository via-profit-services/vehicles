import { buildCursorConnection, ServerError, buildQueryFilter, CursorConnection } from '@via-profit-services/core';
import { Resolvers } from '@via-profit-services/vehicles';

const vehiclesQuery: Resolvers['VehiclesQuery'] = {
  brands: async (_parent, args, context) => {
    const { services } = context;
    const filter = buildQueryFilter(args);

    try {
      const brandsConnection = await services.vehicles.getBrands(filter);
      const connection = buildCursorConnection(brandsConnection, 'vehicle-brands');
      
      return connection;

    } catch (err) {
      throw new ServerError('Failed to get vehicles brands list', { err });
    }
  },
  models: async (_parent, args, context) => {
    const { services } = context;
    const filter = buildQueryFilter(args);

    try {
      const brandsConnection = await services.vehicles.getModels(filter);
      const connection = buildCursorConnection(brandsConnection, 'vehicle-models');
      
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
};

export default vehiclesQuery;
