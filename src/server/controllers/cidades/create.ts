import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  name: string;
  estado: string;
}

const bodyValidation = yup.object().shape({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(3)
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validateData: ICidade | undefined = undefined;
  //const data: ICidade = req.body;

  try {

    validateData = await bodyValidation.validate(req.body, { abortEarly: false });

  } catch (error) {

    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (error.path === undefined) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });

  }

  console.log(validateData);

  return res.send('Create!');
};
