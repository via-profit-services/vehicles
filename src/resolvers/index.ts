import { Resolvers } from '@via-profit-services/vehicles';

import Query from './Query';
import VehiclesQuery from './VehiclesQuery';
import VehicleBrand from './VehicleBrand';
import VehicleModel from './VehicleModel';

const resolvers: Resolvers = {
  Query,
  VehiclesQuery,
  VehicleBrand,
  VehicleModel,
};

export default resolvers;
