import type { VehicleBrandResolver } from '@via-profit-services/vehicles';
import { fieldBuilder } from '@via-profit-services/core';

const brandResolver = fieldBuilder<VehicleBrandResolver>(
  ['id', 'name', 'models'],
  prop => async (parent, _args, context) => {
    const { id } = parent;
    const { dataloader } = context;

    try {
      const brand = await dataloader.vehicles.brands.load(id);

      return brand[prop];
    } catch (err) {
      throw new Error(`Failed to load vehicle brand with id «${id}»`);
    }
  },
);

export default brandResolver;
