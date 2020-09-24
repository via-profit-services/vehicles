import { IResolverObject, IFieldResolver } from 'graphql-tools';

import createDataloaders from '../loaders';
import { Context, VehicleMake } from '../types';

type VehicleMakeResolver = IResolverObject<{ id: string }, Context>;
interface IParent {
  id: string;
}
const vehicleMakeResolver = new Proxy<VehicleMakeResolver>({
  id: () => ({}),
  name: () => ({}),
  createdAt: () => ({}),
  updatedAt: () => ({}),
}, {
  get: (target, prop: keyof VehicleMake) => {
    const resolver: IFieldResolver<IParent, Context> = async (parent, args, context) => {
      const { id } = parent;
      const loaders = createDataloaders(context);
      const vehicle = await loaders.makes.load(id);

      return vehicle[prop];
    };

    return resolver;
  },
});

export default vehicleMakeResolver;
