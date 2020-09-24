import { IResolverObject } from 'graphql-tools';
declare const vehicleMakeResolver: IResolverObject<{
    id: string;
}, Pick<import("@via-profit-services/core").IContext, "knex" | "timezone" | "logger">, any>;
export default vehicleMakeResolver;
