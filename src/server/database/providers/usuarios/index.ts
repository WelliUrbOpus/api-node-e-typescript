import * as count from './count';
import * as create from './create';
import * as getByEmail from './getByEmail';
import * as getByName from './getByName';
import * as getAll from './getAll';
import * as updateById from './updateById';


export const UsuarioProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getByEmail,
    ...getByName,
    ...updateById
};
