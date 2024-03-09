import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlitr3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PROGMA foreign_keys = ON');
            done();
        }
    }
};
export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};
export const production: Knex.Config = {
    ...development,
};