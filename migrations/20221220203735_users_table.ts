import { Knex } from 'knex';

export async function up (knex: Knex): Promise<void> {
    return await knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name').nullable();
        table.string('email').unique().notNullable();
        table.string('password').nullable();
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users');
}
