import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '@exceptions/HttpException';

type RequestParamsFrom = 'body' | 'query' | 'params';

const stringifyValidationErrors = (errors: Array<ValidationError>): string => {
  return errors
    .map((error: ValidationError) => {
      if (error.children.length > 0) {
        return stringifyValidationErrors(error.children);
      }
      return Object.values(error.constraints);
    })
    .join(', ');
};

const validationMiddleware = (
  validator: any,
  params: RequestParamsFrom = 'body',
  options: ValidatorOptions = { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: true },
): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const errors = await validate(plainToInstance(validator, req[params]), options);
      if (errors.length > 0) next(new HttpException(400, stringifyValidationErrors(errors)));

      req[params] = plainToInstance(validator, req[params]);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validationMiddleware;
