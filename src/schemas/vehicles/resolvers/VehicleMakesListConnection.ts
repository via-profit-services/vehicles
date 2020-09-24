import {
  buildQueryFilter,
  buildCursorConnection,
  TInputFilter,
  ServerError,
} from '@via-profit-services/core';
import { IFieldResolver } from 'graphql-tools';

import createLoaders from '../loaders';
import VehiclesService from '../service';
import { Context } from '../types';

const VehicleMakesListConnection: IFieldResolver<any, Context, TInputFilter> = async (
  parent, args, context,
) => {
  const { logger } = context;
  const filter = buildQueryFilter(args);
  const vehiclesService = new VehiclesService({ context });
  const loaders = createLoaders(context);

  try {
    const list = await vehiclesService.getVehacleMakes(filter);

    list.nodes.forEach((node) => {
      loaders.makes.prime(node.id, node);
    });

    return buildCursorConnection(list, 'makes');
  } catch (err) {
    logger.server.error('Failed to get Vehicles makes list', { err });
    throw new ServerError('Failed to get Vehicles makes list', { err });
  }
};

export default VehicleMakesListConnection;
