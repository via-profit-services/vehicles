/* eslint-disable import/no-extraneous-dependencies */
import 'graphql-import-node';

import { configureApp } from './configureApp';

const { database } = configureApp();
const { timezone, ...dbConfig } = database;

const CHARSET = 'UTF8';
const CLIENT = 'pg';

const config = {
  client: CLIENT,
  ...dbConfig,
  pool: {
    afterCreate: (conn: any, done: any) => {
      conn.query(
        `
          SET TIMEZONE = '${timezone}';
          SET CLIENT_ENCODING = ${CHARSET};
        `,
        (err: Error) => {
          done(err, conn);
        },
      );
    },
  },
};

module.exports = config;
