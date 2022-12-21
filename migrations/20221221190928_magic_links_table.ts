import { Knex } from 'knex';

export async function up (knex: Knex): Promise<void> {
    return await knex.schema.createTable('magic_links', (table) => {
        table.increments('id');
        table.integer('user_id').nullable();
        table.string('ref_id').nullable();
        table.string('token').nullable();
        table.timestamp('logged_at').nullable();
        table.timestamp('confirmed_at').nullable();
        table.timestamp('expire_at').nullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}

export async function down (knex: Knex): Promise<void> {
    return await knex.schema.dropTable('magic_links');
}
