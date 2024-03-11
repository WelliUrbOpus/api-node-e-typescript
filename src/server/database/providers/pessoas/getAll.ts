import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';


export const getAll = async (page: number, limit: number, filter: string): Promise<ICidade[] | Error> => {

    try {
        const result = Knex(ETableNames.pessoa)
            .select('*')
            .where('firstName', 'like', `%${filter}%`)
            .orWhere('lastName', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }

};