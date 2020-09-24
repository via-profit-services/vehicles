import {
  TOutputFilter,
  convertOrderByToKnex,
  convertWhereToKnex,
  TWhereAction,
  IListResponse,
} from '@via-profit-services/core';

import {
  Context, VehicleMakeOutput, VehicleModelOutput, VehicleMake, VehicleModel,
} from './types';

interface IProps {
  context: Context;
}

class Vehicles {
  public props: IProps;

  public constructor(props: IProps) {
    this.props = props;
  }

  public async getVehacleMakes(filter: Partial<TOutputFilter>): Promise<IListResponse<VehicleMake>> {
    const { context } = this.props;
    const { knex } = context;
    const {
      limit, offset, orderBy, where, search,
    } = filter;
    const createdAt = new Date();

    const dbResponse = await knex
      .select([
        knex.raw('*'),
        knex.raw('count(*) over() as "totalCount"'),
      ])
      .from<any, Array<VehicleMakeOutput & {totalCount: number}>>('vehiclesMakes')
      .limit(limit || 1)
      .offset(offset || 0)
      .where((builder) => convertWhereToKnex(builder, where))
      .where((builder) => {
        // This is a temporary solution until the «Search» module is implemented
        if (search) {
          search.forEach(({ field, query }) => {
            query.split(' ').map((subquery) => 
              // Note: Set type ::text forcibly
               builder.orWhereRaw(`"${field}"::text ${TWhereAction.ILIKE} '%${subquery}%'`)
            );
          });
        }

        return builder;
      })
      .orderBy(convertOrderByToKnex(orderBy))
      .then(async (nodes) => ({
          totalCount: nodes.length ? Number(nodes[0].totalCount) : 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nodes: nodes.map(({ totalCount, ...nodeData }) => ({
              ...nodeData,
              createdAt,
              updatedAt: createdAt,
            })),
        }));


    const { totalCount, nodes } = dbResponse;

    return {
      totalCount,
      nodes,
      where,
      orderBy,
      limit,
      offset,
    };
  }


public async getVehacleModels(filter: Partial<TOutputFilter>): Promise<IListResponse<VehicleModel>> {
    const { context } = this.props;
    const { knex } = context;
    const {
      limit, offset, orderBy, where, search,
    } = filter;
    const createdAt = new Date();

    const dbResponse = await knex
      .select([
        knex.raw('*'),
        knex.raw('count(*) over() as "totalCount"'),
      ])
      .from<any, Array<VehicleModelOutput & {totalCount: number}>>('vehiclesModels')
      .limit(limit || 1)
      .offset(offset || 0)
      .where((builder) => convertWhereToKnex(builder, where))
      .where((builder) => {
        // This is a temporary solution until the «Search» module is implemented
        if (search) {
          search.forEach(({ field, query }) => {
            query.split(' ').map((subquery) => 
              // Note: Set type ::text forcibly
               builder.orWhereRaw(`"${field}"::text ${TWhereAction.ILIKE} '%${subquery}%'`)
            );
          });
        }

        return builder;
      })
      .orderBy(convertOrderByToKnex(orderBy))
      .then(async (nodes) => ({
          totalCount: nodes.length ? Number(nodes[0].totalCount) : 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          nodes: nodes.map(({ totalCount, ...nodeData }) => ({
              ...nodeData,
              make: {id: nodeData.make},
              createdAt,
              updatedAt: createdAt,
            })),
        }));


    const { totalCount, nodes } = dbResponse;

    return {
      totalCount,
      nodes,
      where,
      orderBy,
      limit,
      offset,
    };
  }

  public async getVehacleMakesByIds(ids: string[]): Promise<VehicleMake[]> {
    const { nodes } = await this.getVehacleMakes({
      where: [['id', TWhereAction.IN, ids]],
      offset: 0,
      limit: ids.length,
    });

    return nodes;
  }

  public async getVehacleModelsByIds(ids: string[]): Promise<VehicleModel[]> {
    const { nodes } = await this.getVehacleModels({
      where: [['id', TWhereAction.IN, ids]],
      offset: 0,
      limit: ids.length,
    });

    return nodes;
  }

  public async getVehicleMake(id: string): Promise<VehicleMake | false> {
    const nodes = await this.getVehacleMakesByIds([id]);
    
    return nodes.length ? nodes[0] : false;
  }


  public async getVehicleModel(id: string): Promise<VehicleModel | false> {
    const nodes = await this.getVehacleModelsByIds([id]);
    
    return nodes.length ? nodes[0] : false;
  }
}


export default Vehicles;
export { Vehicles };
