import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.raw(`

    drop table if exists "vehiclesModels" cascade;
    drop table if exists "vehiclesBrands" cascade;

    CREATE TABLE "vehiclesBrands" (
      "id" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesBrands_pk" PRIMARY KEY (id)
    );

    CREATE TABLE "vehiclesModels" (
      "id" uuid NOT NULL,
      "brand" uuid NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "vehiclesModels_pk" PRIMARY KEY (id)
    );

    ALTER TABLE "vehiclesModels" ADD CONSTRAINT "vehiclesModels_fk_vehiclesBrands" FOREIGN KEY ("brand") REFERENCES "vehiclesBrands"(id) ON DELETE CASCADE on update cascade;

  `);
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`
    drop table if exists "vehiclesModels" cascade;
    drop table if exists "vehiclesBrands" cascade;
  `);
}
