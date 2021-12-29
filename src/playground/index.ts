/* eslint-disable no-console */
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as core from '@via-profit-services/core';
import * as knex from '@via-profit-services/knex';
import * as redis from '@via-profit-services/redis';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import * as vehicles from '../index';

dotenv.config();

const PORT = 9006;
const app = express();
const server = http.createServer(app);
(async () => {

  const redisMiddleware = redis.factory({});

  const knexMiddleware = knex.factory({
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
    },
  });

  const vehiclesMiddleware = vehicles.factory();

  const schema = makeExecutableSchema({
    typeDefs: [
      core.typeDefs,
      vehicles.typeDefs,
    ],
    resolvers: [
      core.resolvers,
      vehicles.resolvers,
    ],
  })

  const { graphQLExpress } = await core.factory({
    schema,
    server,
    debug: true,
    middleware: [
      knexMiddleware,
      redisMiddleware,
      vehiclesMiddleware,
    ],
  });

  app.use(graphQLExpress);
  server.listen(PORT, () => {
    console.log(`GraphQL server started at http://localhost:${PORT}/graphql`);
  });

})();