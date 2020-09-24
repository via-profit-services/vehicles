import resolvers from './resolvers';

import * as typeDefs from './schema.graphql';

import Vehicles from './service';

export * from './types';
export {
  Vehicles,
  resolvers,
  typeDefs,
};
