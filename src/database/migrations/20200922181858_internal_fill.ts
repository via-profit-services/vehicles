/* eslint-disable  */
import { Knex}  from '@via-profit-services/core';

// import vehicles from '../../../dist/vehicles';

export async function up(knex: Knex): Promise<any> {
  return Promise.resolve();
  // return new Promise(async (resolve) => {
  //   await knex.raw(`
  //     ${knex('vehiclesMakes').insert(vehicles.makes).toQuery()}
  //     on conflict ("id") do update set
  //     ${Object.keys(vehicles.makes[0]).map((field) => `"${field}" = excluded."${field}"`).join(',')}
  //   `);

  //   await knex.raw(`
  //     ${knex('vehiclesModels').insert(vehicles.models).toQuery()}
  //     on conflict ("id") do update set
  //     ${Object.keys(vehicles.models[0]).map((field) => `"${field}" = excluded."${field}"`).join(',')}
  //   `);

  //   resolve();
  // });
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.resolve();
  // return knex.raw(`
  //   delete from "vehiclesModels";
  //   delete from "vehiclesMakes";
  // `);
}
