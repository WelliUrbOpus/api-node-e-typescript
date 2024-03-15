import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuarioProvider } from '../../database/providers/usuarios';

//Interface para validação do POST
interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUsuario, 'id' | 'status'| 'levelName'> { }

//Regras de validação do POST usando o 'Yup'
export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
        password: yup.string().required().min(4).max(16),
        email: yup.string().required().email(),
        levelId: yup.number().integer().required().moreThan(0),
        status:yup.string().oneOf(['Activated', 'Disabled']).optional(),
        levelName: yup.string().optional().nullable(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "id" precisa ser infromado.'
            }
        });
    }

    const result = await UsuarioProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
