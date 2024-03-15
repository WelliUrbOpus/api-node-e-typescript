import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';


//Interface para validação do POST
interface IParamProps {
    name?: string;
}

//Regras de validação do POST usando o 'Yup'
export const getByNameValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        name: yup.string().required().min(4),
    })),
}));

export const getByName = async (req: Request<IParamProps>, res: Response) => {
    
    if (!req.params.name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "name" precisa ser infromado.'
            }
        });
    }

    const result = await UsuarioProvider.getByEmail(req.params.name);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.OK).json(result);
};
