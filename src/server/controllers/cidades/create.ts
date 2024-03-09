import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';


//Interface para validação do POST
interface IBodyProps extends Omit<ICidade, 'id'> { }

//Regras de validação do POST usando o 'Yup'
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3)
    })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    //console.log(req.body);

    return res.status(StatusCodes.CREATED).json(10);
};
