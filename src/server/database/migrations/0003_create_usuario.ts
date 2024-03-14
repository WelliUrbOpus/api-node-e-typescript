import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuario, table => {
            table.bigIncrements('id').primary().index();
            table.string('name').index().notNullable();
            table.string('email').index().unique().notNullable().checkLength('>=', 4);
            table.string('password', 16).checkLength('>=', 4).checkLength('<=', 16).notNullable();

            table.string('levelUser', 16)
                .checkLength('<=', 16)
                .notNullable()
                .references('level')
                .inTable(ETableNames.levelUser)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar usuarios do sistema');
        })
        .then(() => {
            console.log(`# Created table de ${ETableNames.usuario}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.usuario).then(() => {
            console.log(`# Dropped table ${ETableNames.usuario}`);
        });
}

