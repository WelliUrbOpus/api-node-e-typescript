import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';


//Interface para validação do POST
interface IParamProps {
    email?: string;
}

//Regras de validação do POST usando o 'Yup'
export const getByEmailValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        email: yup.string().required().min(4).max(16),
    })),
}));

export const getByEmail = async (req: Request<IParamProps>, res: Response) => {
    
    if (!req.params.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "email" precisa ser infromado.'
            }
        });
    }

    const result = await UsuarioProvider.getByEmail(req.params.email);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.OK).json(result);
};
