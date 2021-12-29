import type { VehicleModelResolver } from '@via-profit-services/vehicles';
import { ServerError } from '@via-profit-services/core';

const modelResolver = new Proxy<VehicleModelResolver>({
  id: () => ({}),
  name: () => ({}),
  brand: () => ({}),
}, {
  get: (target, prop: keyof VehicleModelResolver) => {
    const resolver: VehicleModelResolver[keyof VehicleModelResolver] = async (parent, args, context) => {
      const { id } = parent;
      const { dataloader } = context;

      try {
        const model = await dataloader.vehicles.models.load(id);

        return model[prop];
      } catch ( err ) {
        throw new ServerError(
          `Failed to load vehicle model with id «${id}»`, { err },
        )
      }
    };

    return resolver;
  },
});

export default modelResolver;