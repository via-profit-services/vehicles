import { IObjectTypeResolver } from '@via-profit-services/core';
declare const vehicleMakeResolver: IObjectTypeResolver<{
    id: string;
}, Pick<import("@via-profit-services/core").IContext, "knex" | "timezone" | "logger">, any>;
export default vehicleMakeResolver;
