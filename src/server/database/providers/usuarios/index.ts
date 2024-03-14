import * as create from './create';
import * as getByEmail from './create';
import * as getByUser from './create';


export const UsuarioProvider = {
    ...create,
    ...getByEmail,
    ...getByUser
};
