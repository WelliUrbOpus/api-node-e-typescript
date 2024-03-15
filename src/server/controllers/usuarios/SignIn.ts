import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';

interface IBodyProps {
    typeLogin: string;
    user: string;
    password: string;
}

//Regras de validação do POST usando o 'Yup'
export const getByEmailValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        typeLogin: yup.string().required().oneOf(['email', 'name']).nonNullable(),
        password: yup.string().required().min(4),
        user: yup.string().required(),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { typeLogin, user, password } = req.body;

    if (typeLogin === 'email') {
        const resultEmail = await UsuarioProvider.getByEmail(user);
        if (resultEmail instanceof Error) return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são inválidos'
            }
        });

        if (password !== resultEmail.password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha são inválidos'
                }
            });
        } else {
            return res.status(StatusCodes.OK).json({ accessTokem: 'teste.teste.teste' });
        }


    } else {
        const resultName = await UsuarioProvider.getByName(user);
        if (resultName instanceof Error) return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Usuário ou senha são inválidos'
            }
        });


    }
};
