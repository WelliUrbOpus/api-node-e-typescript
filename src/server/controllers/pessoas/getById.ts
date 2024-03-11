import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middleware';


//Interface para validação do POST
interface IParamProps {
    id?: number;
}

//Regras de validação do POST usando o 'Yup'
export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
    
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "id" precisa ser infromado.'
            }
        });
    }

    const result = await PessoasProvider.getById(req.params.id);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.OK).json(result);
};
