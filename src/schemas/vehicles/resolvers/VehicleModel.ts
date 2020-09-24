import { IResolverObject, IFieldResolver } from 'graphql-tools';

import createDataloaders from '../loaders';
import { Context, VehicleModel } from '../types';

type VehicleModelResolver = IResolverObject<{ id: string }, Context>;
interface IParent {
  id: string;
}
const vehicleModelResolver = new Proxy<VehicleModelResolver>({
  id: () => ({}),
  name: () => ({}),
  make: () => ({}),
  createdAt: () => ({}),
  updatedAt: () => ({}),
}, {
  get: (target, prop: keyof VehicleModel) => {
    const resolver: IFieldResolver<IParent, Context> = async (parent, args, context) => {
      const { id } = parent;
      const loaders = createDataloaders(context);
      const vehicle = await loaders.models.load(id);

      return vehicle[prop];
    };

    return resolver;
  },
});

export default vehicleModelResolver;
