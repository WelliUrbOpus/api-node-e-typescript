import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {

    try {
        const [{ count }] = await Knex(ETableNames.levelUser)
            .where('level', '=', usuario.level)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('A cidade usada no cadastro não foi encontrada');
        }

        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');
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