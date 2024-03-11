import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PessoasProvider } from '../../database/providers/pessoas';

//Interface para validação do POST
interface IParamProps {
    id?: number;
}
//Regras de validação do POST usando o 'Yup'
export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {  

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "id" precisa ser infromado.'
            }
        });
    }

    const result = await PessoasProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: {
                default: result.message,
            }
        });
    }
    
    return res.status(StatusCodes.NO_CONTENT).send();
};
