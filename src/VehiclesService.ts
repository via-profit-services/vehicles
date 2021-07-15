import {
  OutputFilter,
  ListResponse,
  arrayOfIdsToArrayOfObjectIds,
} from '@via-profit-services/core';
import type {
  VehiclesServiceProps,
  VehicleBrand,
  VehicleModel,
  VehiclesService as ServiceImplementation,
  VehicleBrandsTableRecord,
  VehicleBrandsTableRecordResponse,
  VehicleModelsTableRecord,
  VehicleModelsTableRecordResponse,
  VehicleSearchRecord,
  VehicleSearchTableRecordResponse,
  VehicleSearchTableRecord,
} from '@via-profit-services/vehicles';
import {
  convertOrderByToKnex,
  convertWhereToKnex,
  convertSearchToKnex,
  extractTotalCountPropOfNode,
} from '@via-profit-services/knex';
import { Knex } from 'knex';

class VehiclesService implements ServiceImplementation {
  public props: VehiclesServiceProps;

  public constructor(props: VehiclesServiceProps) {
    this.props = props;
  }

  public async getBrands(filter: Partial<OutputFilter>): Promise<ListResponse<VehicleBrand>> {
    const { context } = this.props;
    const { knex } = context;
    const { limit, offset, orderBy, where, search } = filter;

    const response = await knex
      .select([
        knex.raw('"vehiclesBrands".*'),
        knex.raw('count(*) over() as "totalCount"'),
        knex.raw('string_agg(distinct ??::text, ?::text) AS "models"', ['vehiclesModels.id', '|']),
      ])
      .from<VehicleBrandsTableRecord, VehicleBrandsTableRecordResponse[]>('vehiclesBrands')
      .leftJoin('vehiclesModels', 'vehiclesModels.brand', 'vehiclesBrands.id')
      .groupBy('vehiclesBrands.id')
      .limit(limit || 1)
      .offset(offset || 0)
      .where(builder =>
        convertWhereToKnex(builder, where, {
          vehiclesBrands: '*',
        }),
      )
      .where(builder =>
        convertSearchToKnex(builder, search, {
          vehiclesBrands: '*',
        }),
      )
      .orderBy(convertOrderByToKnex(orderBy))
      .then(nodes =>
        nodes.map(node => ({
          ...node,
          models: arrayOfIdsToArrayOfObjectIds(node.models.split('|')),
        })),
      )
      .then(nodes => ({
        ...extractTotalCountPropOfNode(nodes),
        offset,
        limit,
        orderBy,
        where,
      }));

    return response;
  }

  public async getBrandsByIds(ids: string[]): Promise<VehicleBrand[]> {
    const { nodes } = await this.getBrands({
      where: [['id', 'in', ids]],
      offset: 0,
      limit: ids.length,
    });

    return nodes;
  }

  public async getBrand(id: string): Promise<VehicleBrand | false> {
    const nodes = await this.getBrandsByIds([id]);

    return nodes.length ? nodes[0] : false;
  }

  public async getModels(filter: Partial<OutputFilter>): Promise<ListResponse<VehicleModel>> {
    const { context } = this.props;
    const { knex } = context;
    const { limit, offset, orderBy, where, search } = filter;

    const response = await knex
      .select([knex.raw('*'), knex.raw('count(*) over() as "totalCount"')])
      .from<VehicleModelsTableRecord, VehicleModelsTableRecordResponse[]>('vehiclesModels')
      .limit(limit || 1)
      .offset(offset || 0)
      .where(builder =>
        convertWhereToKnex(builder, where, {
          vehiclesModels: '*',
        }),
      )
      .where(builder =>
        convertSearchToKnex(builder, search, {
          vehiclesModels: '*',
        }),
      )
      .orderBy(convertOrderByToKnex(orderBy))
      .then(nodes =>
        nodes.map(node => ({
          ...node,
          brand: {
            id: node.brand,
          },
        })),
      )
      .then(nodes => ({
        ...extractTotalCountPropOfNode(nodes),
        offset,
        limit,
        orderBy,
        where,
      }));

    return response;
  }

  public async getModelsByIds(ids: string[]): Promise<VehicleModel[]> {
    const { nodes } = await this.getModels({
      where: [['id', 'in', ids]],
      offset: 0,
      limit: ids.length,
    });

    return nodes;
  }

  public async getModel(id: string): Promise<VehicleModel | false> {
    const nodes = await this.getModelsByIds([id]);

    return nodes.length ? nodes[0] : false;
  }

  public compileSearchQuery(builder: Knex.QueryBuilder, queryArray: string[]): Knex.QueryBuilder {
    const fieldsArray = ["vehiclesModels.name", "vehiclesBrands.name"];
    let i = 1;

    queryArray.forEach((queryPart) => {
      fieldsArray.forEach((field) => {
        if (i === 1){
          builder.where(field, 'ilike', `%${queryPart}%`);
        }else{
          builder.orWhere(field, 'ilike', `%${queryPart}%`);
        }
        i++;
      });
    });

    return builder;
  }

  public async searchBrandModel(query: string): Promise<VehicleSearchRecord[]> {
    const { context } = this.props;
    const { knex } = context;

    const queryArray = query.trim().split(' ');

    const response = await knex
      .select([knex.raw('"vehiclesModels".*'), knex.raw('"vehiclesBrands".name' as 'brandName'), knex.raw(`similarity("vehiclesBrands"."name", '${query}') + similarity("vehiclesModels"."name", '${query}') as "summary"`)])
      .from<VehicleSearchTableRecord, VehicleSearchTableRecordResponse[]>('vehiclesModels')
      .leftJoin('vehiclesBrands', 'vehiclesBrands.id', 'vehiclesModels.brand')
      .where(builder => this.compileSearchQuery(builder, queryArray))
      .orderBy('summary', 'desc')
      .then(nodes =>
        nodes.map(node => ({
          id: `${node.id}|${node.brand}`,
          brand: {
            id: node.brand,
            name: node.brandName,
          },
          model: {
            id: node.id,
            name: node.name,
          },
        })),
      );

    return response;
  }
}

export default VehiclesService;