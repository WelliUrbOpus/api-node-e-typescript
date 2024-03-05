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
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não imprementado a Query!');
};
