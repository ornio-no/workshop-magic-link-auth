import './src/initializers/dotenv';

import { DB_DRIVER, DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } from './src/config/knex';

module.exports = {
    client: DB_DRIVER,
    connection: {
        host: DB_HOSTNAME,
        server: DB_HOSTNAME,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: Number(DB_PORT)
    }
};
