import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';


export const updateById = async (id: Number, usuario: Omit<IUsuario, 'id'>): Promise<void | Error> => {

    try {

        const [{ count }] = await Knex(ETableNames.levelUser)
            .where('id', '=', usuario.levelId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('A nivel de usuario usada no cadastro não foi encontrada');
        }

        const result = await Knex(ETableNames.usuario)
            .update(usuario)
            .where('id', '=', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }

};