import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {

    try {
        const result = Knex(ETableNames.cidade)
            .select('*')
            .where('id', Number(id))
            .orWhere('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && (await result).every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.cidade)
                .select('*')
                .where('id', '=', id)
                .first();

            if (resultById) return [...await result, resultById];
        }


        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }

};