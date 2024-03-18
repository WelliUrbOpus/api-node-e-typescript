import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '../../database/providers/usuarios';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { JWTService, PasswordCrypto } from '../../shared/services';

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



        const usuarioEmail = await UsuarioProvider.getByEmail(user);
        if (usuarioEmail instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha são inválidos'
                }
            });
        }

        const passwordMatchEmail = await PasswordCrypto.verifyPassword(password, usuarioEmail.password);
        if (!passwordMatchEmail) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Email ou senha são inválidos'
                }
            });
        } else {
            const accessTokem = await JWTService.sign({ uid: usuarioEmail.id });//Criar token de acesso
            if (accessTokem === 'JTW_SECRET_NOT_FOUND') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: 'Erro ao gerar o token de acesso'
                    }
                });
            }

            return res.status(StatusCodes.OK).json({ accessToken: accessTokem });
        }


    } else {
        //Caso typeLogin for "name"
        const usuarioName = await UsuarioProvider.getByName(user);

        if (usuarioName instanceof Error) {

            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Usuário ou senha são inválidos'
                }
            });
        }
        const passwordMatchName = await PasswordCrypto.verifyPassword(password, usuarioName.password);
        if (!passwordMatchName) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: 'Usuário ou senha são inválidos'
                }
            });
        } else {

            const accessTokem = await JWTService.sign({ uid: usuarioName.id });//Criar token de acesso
            if (accessTokem === 'JTW_SECRET_NOT_FOUND') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: 'Erro ao gerar o token de acesso'
                    }
                });
            }

            return res.status(StatusCodes.OK).json({ accessToken: accessTokem });
        }


    }
};
