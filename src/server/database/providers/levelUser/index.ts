import * as count from './count';
import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';


export const LevelUserProvider = {
    ...create,
    ...count,
    ...getAll,
    ...getById,
};
