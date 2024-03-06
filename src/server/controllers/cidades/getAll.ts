import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';


//Interface para validação do POST
interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

//Regras de validação do POST usando o 'Yup'
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().integer().optional().moreThan(0),
        limit: yup.number().integer().optional().moreThan(0),
        filter: yup.string().optional()
    })),
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    //console.log(req.query);
    res.setHeader('access-countrol-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: 'Louveira',
        }
    ]);
};
