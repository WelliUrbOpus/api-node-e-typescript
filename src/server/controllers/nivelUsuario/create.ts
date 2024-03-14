import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ILevelUser } from '../../database/models';
import { LevelUserProvider } from '../../database/providers/levelUser';


//Interface para validação do POST
interface IBodyProps extends Omit<ILevelUser, 'id'> { }

//Regras de validação do POST usando o 'Yup'
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        level: yup.string().required().min(3).max(16),
    })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await LevelUserProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
