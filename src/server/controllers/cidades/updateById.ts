import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

//Interface para validação do POST
interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> { }

//Regras de validação do POST usando o 'Yup'
export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
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

    const result = await CidadesProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.NO_CONTENT).json(result);
};
