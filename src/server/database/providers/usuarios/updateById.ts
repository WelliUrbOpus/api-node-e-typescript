import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario, ILevelUser} from '../../models';


export const updateById = async (id: Number, usuario: Omit<IUsuario, 'id'>): Promise<void | Error> => {

    try {

        const [{ count }] = await Knex(ETableNames.levelUser)
            .where('id', '=', usuario.levelId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('A nivel de usuario usada no cadastro não foi encontrada');
        }

        //Busca na tabela de levelUser o level de acordo com o ID informado
        const levelName: ILevelUser = await Knex(ETableNames.levelUser)
            .select('*')
            .where('id', '=', usuario.levelId)
            .first()
            .returning('levelName');
        usuario.levelName = levelName.level;
        console.log(` ###### ${usuario.levelName}`);

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