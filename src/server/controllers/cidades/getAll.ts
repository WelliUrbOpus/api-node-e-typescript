import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CidadesProvider } from '../../database/providers/cidades';


//Interface para validação do POST
interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

//Regras de validação do POST usando o 'Yup'
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().integer().optional().moreThan(0),
        limit: yup.number().integer().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional(),
    })),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await CidadesProvider.getAll(Number(req.query.page) || 1, Number(req.query.limit) || 7, req.query.filter || '', Number(req.query.id  || 0));
    const count = await CidadesProvider.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: count.message
        });
    }


    res.setHeader('access-countrol-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};
