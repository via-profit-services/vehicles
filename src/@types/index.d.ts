declare module '@via-profit-services/vehicles' {
  import { Context, OutputFilter, ListResponse, Middleware, InputFilter } from '@via-profit-services/core';
  import { GraphQLFieldResolver } from 'graphql';

  export interface VehiclesServiceProps {
    context: Context;
  }

  export type VehiclesMiddlewareFactory = () => Middleware;

  export type VehicleBrand = {
    id: string;
    name: string;
    models: Array<{
      id: string;
    }>;
  }

  export type VehicleModel = {
    id: string;
    name: string;
    brand: {
      id: string;
    };
  }

  export type VehicleBrandsTableRecord = {
    readonly id: string;
    readonly name: string;
  }

  export type VehicleBrandsTableRecordResponse = {
    readonly id: string;
    readonly name: string;
    readonly models: string;
    readonly totalCount: number;
  }

  export type VehicleModelsTableRecord = {
    readonly id: string;
    readonly name: string;
    readonly brand: string;
  }

  export type VehicleModelsTableRecordResponse = {
    readonly id: string;
    readonly name: string;
    readonly brand: string;
    readonly totalCount: number;
  }

  /**
   * For VehiclesService.createBrand() method
   */
  export type VehicleBrandCreateProps = {
    id: string;
    name: string;
  };

  /**
   * For VehiclesService.updateBrand() method
   */
  export type VehicleBrandUpdateProps = {
    id?: string;
    name?: string;
  };

  /**
   * For resolvers only
   */
  export type VehicleBrandInputCreate = {
    id: string;
    name: string;
  }

  /**
   * For resolvers only
   */
  export type VehicleBrandInputUpdate = {
    id?: string;
    name?: string;
  }

    /**
   * For VehiclesService.createModel() method
   */
  export type VehicleModelCreateProps = {
    id: string;
    name: string;
    brand: string;
  };

  /**
   * For VehiclesService.updateModel() method
   */
  export type VehicleModelUpdateProps = {
    id?: string;
    name?: string;
    brand?: string;
  };

  /**
   * For resolvers only
   */
  export type VehicleModelInputCreate = {
    id: string;
    name: string;
  }

  /**
   * For resolvers only
   */
  export type VehicleModelInputUpdate = {
    id?: string;
    name?: string;
    brand?: string;
  }

  export type Resolvers = {
    Query: {
      vehicles: GraphQLFieldResolver<unknown, Context>;
    };
    VehiclesQuery: {
      brands: GraphQLFieldResolver<unknown, Context, InputFilter>;
      models: GraphQLFieldResolver<unknown, Context, InputFilter>;
      brand: GraphQLFieldResolver<unknown, Context, {
        id: string;
      }>;
      model: GraphQLFieldResolver<unknown, Context, {
        id: string;
      }>;
    };
    VehicleBrand: VehicleBrandResolver;
    VehicleModel: VehicleModelResolver;
  };

  export type VehicleBrandResolver = Record<keyof VehicleBrand, GraphQLFieldResolver<{
    id: string;
  }, Context>>;

  export type VehicleModelResolver = Record<keyof VehicleModel, GraphQLFieldResolver<{
    id: string;
  }, Context>>;

  class VehiclesService {
    props: VehiclesServiceProps;
    constructor(props: VehiclesServiceProps);
    getBrands(filter: Partial<OutputFilter>): Promise<ListResponse<VehicleBrand>>;
    getBrandsByIds(ids: string[]): Promise<VehicleBrand[]>;
    getBrand(id: string): Promise<VehicleBrand | false>;
    getModels(filter: Partial<OutputFilter>): Promise<ListResponse<VehicleModel>>;
    getModelsByIds(ids: string[]): Promise<VehicleModel[]>;
    getModel(id: string): Promise<VehicleModel | false>;
  }

  export const typeDefs: string;
  export const resolvers: any;
  export const factory: VehiclesMiddlewareFactory;
}

declare module '@via-profit-services/core' {
  import DataLoader from 'dataloader';
  import { VehicleModel, VehicleBrand, VehiclesService } from '@via-profit-services/vehicles';

  interface DataLoaderCollection {
    vehicles: {
      brands: DataLoader<string, Node<VehicleBrand>>;
      models: DataLoader<string,  Node<VehicleModel>>;
    }
  }

  interface ServicesCollection {
    vehicles: VehiclesService;
  }
}

