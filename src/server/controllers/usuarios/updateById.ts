import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuarioProvider } from '../../database/providers/usuarios';

//Interface para validação do POST

interface IBodyProps extends Omit<IUsuario, 'status' | 'levelName'> { }

//Regras de validação do POST usando o 'Yup'
export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        id: yup.number().integer().required().nonNullable().moreThan(0),
        name: yup.string().required().min(3),
        password: yup.string().required().min(4).max(16),
        email: yup.string().required().email().test('is-lowercase', 'O e-mail deve conter apenas letras minúsculas', value => {
            if (!value) return true; // Se o valor estiver vazio, a validação passa
            return value === value.toLowerCase(); // Verifica se o valor é igual ao valor convertido para minúsculas
        }),
        levelId: yup.number().integer().required().moreThan(0),
        status: yup.string().oneOf(['Activated', 'Disabled']).optional(),
        levelName: yup.string().optional().nullable(),
    }))  
}));

export const updateById = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    if (!req.body.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parametro de "id" precisa ser infromado.'
            }
        });
    }

    const result = await UsuarioProvider.updateById(req.body);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
