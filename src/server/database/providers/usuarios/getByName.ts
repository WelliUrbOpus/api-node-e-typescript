import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';


export const getByName = async (name: string): Promise<IUsuario | Error> => {
    try {
        //console.log(` Provaider Buscar Name: ${name}`);

        const result = await Knex(ETableNames.usuario)
            .select('*')
            .where('name', '=', name)
            .first();

        if (result) return result;

        return new Error('Pro Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
};