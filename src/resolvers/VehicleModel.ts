import type { VehicleModelResolver } from '@via-profit-services/vehicles';
import { fieldBuilder } from '@via-profit-services/core';

const modelResolver = fieldBuilder<VehicleModelResolver>(
  ['id', 'name', 'brand'],
  prop => async (parent, _args, context) => {
    const { id } = parent;
    const { dataloader } = context;

    try {
      const model = await dataloader.vehicles.models.load(id);

      return model[prop];
    } catch (err) {
      throw new Error(`Failed to load vehicle model with id «${id}»`);
    }
  },
);

export default modelResolver;
