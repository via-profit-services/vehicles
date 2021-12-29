import type { VehicleBrandResolver } from '@via-profit-services/vehicles';
import { ServerError } from '@via-profit-services/core';

const brandResolver = new Proxy<VehicleBrandResolver>({
  id: () => ({}),
  name: () => ({}),
  models: () => ({}),
}, {
  get: (target, prop: keyof VehicleBrandResolver) => {
    const resolver: VehicleBrandResolver[keyof VehicleBrandResolver] = async (parent, args, context) => {
      const { id } = parent;
      const { dataloader } = context;

      try {
        const brand = await dataloader.vehicles.brands.load(id);

        return brand[prop];
      } catch ( err ) {
        throw new ServerError(
          `Failed to load vehicle brand with id «${id}»`, { err },
        )
      }
    };

    return resolver;
  },
});

export default brandResolver;