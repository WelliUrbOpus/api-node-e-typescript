import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ILevelUser } from '../../models';


export const create = async (level: Omit<ILevelUser, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.levelUser).insert(level).returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }

};