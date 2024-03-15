import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.levelUser).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const levelToInsert = listLevelUser.map(nomeLevel => ({ level: nomeLevel }));
    console.log(`###### Tamanho da lista de level user: ${levelToInsert.length}`);
    await knex(ETableNames.levelUser).insert(levelToInsert);
};

const listLevelUser = [
    'admin',
    'opus',
    'master',
    'quality',
    'supervisor',
    'operator'
];
