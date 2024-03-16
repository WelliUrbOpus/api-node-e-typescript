import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuario, table => {
            table.bigIncrements('id').primary().index();
            table.string('name').index().unique().notNullable().checkLength('>=', 3);
            table.string('email').index().unique().notNullable().checkLength('>=', 4);
            table.string('password').notNullable();
            table.enu('status', ['Activated', 'Disabled']).index().checkLength('>=', 4).checkLength('<=', 16).notNullable().defaultTo('Activated');

            table.bigInteger('levelId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames.levelUser)
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.string('levelName', 16).checkLength('>=', 3).checkLength('<=', 16).notNullable();

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

