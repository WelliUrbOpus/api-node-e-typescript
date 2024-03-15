import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuarioProvider } from '../../database/providers/usuarios';


//Interface para validação do POST
interface IBodyProps extends Omit<IUsuario, 'id' | 'status' | 'levelName'> { }

//Regras de validação do POST usando o 'Yup'
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
        password: yup.string().required().min(4).max(16),
        email: yup.string().required().email().test('is-lowercase', 'O e-mail deve conter apenas letras minúsculas', value => {
            if (!value) return true; // Se o valor estiver vazio, a validação passa
            return value === value.toLowerCase(); // Verifica se o valor é igual ao valor convertido para minúsculas
        }),
        levelId: yup.number().integer().required().moreThan(0),
        status: yup.string().oneOf(['Activated', 'Disabled']).optional(),
        levelName: yup.string().optional().nullable(),
    })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuarioProvider.create(req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
