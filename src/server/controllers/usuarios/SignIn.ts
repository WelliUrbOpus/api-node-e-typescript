import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '../../database/providers/usuarios';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PasswordCrypto } from '../../shared/services';

interface IBodyProps {
    typeLogin: string;
    user: string;
    password: string;
}

//Regras de validação do POST usando o 'Yup'

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        typeLogin: yup.string().required().oneOf(['email', 'name']).nonNullable(),
        password: yup.string().required().min(4),
        user: yup.string().required(),
    })),
}));


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { typeLogin, user, password } = req.body;

    if (typeLogin === 'email') {

        try {
            // Validação do formato de email
            await yup.string().email().validate(user);

            // Validação das letras minúsculas
            if (user.toLowerCase() !== user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        default: 'O email deve conter apenas letras minúsculas'
                    }
                });
            }
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Formato de email inválido'
                }
            });
        }



        const resultEmail = await UsuarioProvider.getByEmail(user);
        if (resultEmail instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha são inválidos'
                }
            });
        }

        const passwordMatchEmail = await PasswordCrypto.verifyPassword(password, resultEmail.password);
        if (!passwordMatchEmail) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha são inválidos'
                }
            });
        } else {
            return res.status(StatusCodes.OK).json({ accessTokem: 'teste.teste.teste' });
        }


    } else {
        //Caso typeLogin for "name"
        const resultName = await UsuarioProvider.getByName(user);

        if (resultName instanceof Error) {

            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Usuário ou senha são inválidos'
                }
            });
        }
        const passwordMatchName = await PasswordCrypto.verifyPassword(password, resultName.password);
        if (!passwordMatchName) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Usuário ou senha são inválidos'
                }
            });
        } else {
            return res.status(StatusCodes.OK).json({ accessTokem: 'teste.teste.teste' });
        }


    }
};
