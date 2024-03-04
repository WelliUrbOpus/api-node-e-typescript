import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, Schema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;


export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(Schema => Schema);

    const errorResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });

        } catch (err) {

            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            errorResult[key] = errors;
        }
    });

    if (Object.entries(errorResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorResult });
    }

};