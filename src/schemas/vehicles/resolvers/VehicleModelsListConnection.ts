import {
  buildQueryFilter,
  buildCursorConnection,
  TInputFilter,
  ServerError,
  IFieldResolver,
} from '@via-profit-services/core';

import createLoaders from '../loaders';
import VehiclesService from '../service';
import { Context } from '../types';

const VehicleModelsListConnection: IFieldResolver<any, Context, TInputFilter> = async (
  parent, args, context,
) => {
  const { logger } = context;
  const filter = buildQueryFilter(args);
  const vehiclesService = new VehiclesService({ context });
  const loaders = createLoaders(context);

  try {
    const list = await vehiclesService.getVehacleModels(filter);

    list.nodes.forEach((node) => {
      loaders.models.prime(node.id, node);
    });

    return buildCursorConnection(list, 'models');
  } catch (err) {
    logger.server.error('Failed to get Vehicles models list', { err });
    throw new ServerError('Failed to get Vehicles models list', { err });
  }
};

export default VehicleModelsListConnection;
