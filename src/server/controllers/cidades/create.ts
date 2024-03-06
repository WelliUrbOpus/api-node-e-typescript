import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';


//Interface para validação do POST
interface ICidade {
    name: string;
}

//Regras de validação do POST usando o 'Yup'
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        name: yup.string().required().min(3)
    })),
}));


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    //console.log(req.body);

    return res.status(StatusCodes.CREATED).json(1);
};
