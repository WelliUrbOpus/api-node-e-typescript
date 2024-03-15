import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ILevelUser, IUsuario } from '../../models';

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {

    try {

        const [{ count }] = await Knex(ETableNames.levelUser)
            .where('id', '=', usuario.levelId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('O usuario usada no cadastro não foi encontrada');
        }



        //Busca na tabela de levelUser o level de acordo com o ID informado
        const levelName: ILevelUser = await Knex(ETableNames.levelUser)
            .select('*')
            .where('id', '=', usuario.levelId)
            .first()
            .returning('levelName');
        usuario.levelName = levelName.level;
        //console.log(` ###### ${usuario.levelName}`);

        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');
        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro');

    } catch (error) {
        console.log(error);
        return new Error(`Erro ao cadastrar o registro => ${error}`);
    }

};