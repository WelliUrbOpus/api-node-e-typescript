import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ILevelUser } from '../../models';


export const getAll = async (page: number, limit: number, filter: string): Promise<ILevelUser[] | Error> => {

    try {
        const result = Knex(ETableNames.levelUser)
            .select('*')
            .where('level', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }

};