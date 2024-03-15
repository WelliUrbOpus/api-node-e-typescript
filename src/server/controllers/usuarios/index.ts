import * as create from './create';
import * as getAll from './getAll';
import * as getByEmail from './SignIn';
import * as getByName from './getByName';
import * as updateById from './updateById';


export const UsuariosController = {
    ...create,
    ...getAll,
    ...getByEmail,
    ...getByName,
    ...updateById,
};
