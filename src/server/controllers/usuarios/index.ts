import * as create from './create';
import * as getAll from './getAll';
import * as signIn from './SignIn';
import * as updateById from './updateById';


export const UsuariosController = {
    ...create,
    ...getAll,
    ...signIn,
    ...updateById,
};
