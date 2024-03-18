import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, status: string): Promise<IUsuario[] | Error> => {

    try {
        const result = await Knex(ETableNames.usuario)
            .select('id', 'name', 'email', 'status', 'levelName')
            .where('name', 'like', `%${filter}%`)
            .orWhere('status', 'like', `%${status}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        return result as IUsuario[];

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};