import createHttpError from "http-errors";
import { Request, Response, NextFunction } from 'express';
import Joi from "joi";

const validator = async (
  schemaName: Joi.ObjectSchema,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const value = await schemaName.validate(req.body);
  try {
    if (value.error) {
      return res.status(400).json({ message: value.error.message });
  }
  return next();

  } catch (error) {
    console.log(error);
  }
};

export default validator;