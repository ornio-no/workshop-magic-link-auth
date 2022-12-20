import Knex from 'knex';
import { Model } from 'objection';
import { DB_DRIVER, DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config/knex';

const knexConfig = {
    client: DB_DRIVER,
    connection: {
        host: DB_HOSTNAME,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: Number(DB_PORT)
    }
};

export const knex = Knex(knexConfig);
Model.knex(knex);
