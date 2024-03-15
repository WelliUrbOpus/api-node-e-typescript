import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ILevelUser } from '../../models';


export const getById = async (id: number): Promise<ILevelUser | Error> => {

    try {
        const result = await Knex(ETableNames.levelUser)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;

        return new Error('Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }

};