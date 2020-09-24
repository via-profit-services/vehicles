/**
 * @via-profit-services/vehicles
 *
 * This migration file was created by the @via-profit-services/vehicles package
 * This migration will create 2 tables:
 *     `vehiclesMakes`
 *     `vehiclesModels`
 */

/* eslint-disable */

import { Knex } from '@via-profit-services/core';

export async function up(knex: Knex): Promise<any> {
  return knex.raw(`

    CREATE TABLE "vehiclesMakes" (
      "id" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesMakes_pk" PRIMARY KEY (id)
    );

    CREATE TABLE "vehiclesModels" (
      "id" uuid NOT NULL,
      "make" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesModels_pk" PRIMARY KEY (id)
    );

    ALTER TABLE "vehiclesModels" ADD CONSTRAINT "vehiclesModels_fk_vehiclesMakes" FOREIGN KEY ("make") REFERENCES "vehiclesMakes"(id) ON DELETE CASCADE;

  `);
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`
    drop table if exists "vehiclesModels" cascade;
    drop table if exists "vehiclesMakes" cascade;
  `);
}
