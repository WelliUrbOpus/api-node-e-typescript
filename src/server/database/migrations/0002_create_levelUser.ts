import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.levelUser, table => {
            table.bigIncrements('id').primary().index();
            table.string('level', 16).checkLength('<=', 16).index().notNullable();

            table.comment('Tabela usada para armazenar nível de usuário');
        })
        .then(() => {
            console.log(`# Created table de ${ETableNames.levelUser}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.levelUser).then(() => {
            console.log(`# Dropped table ${ETableNames.levelUser}`);
        });
}