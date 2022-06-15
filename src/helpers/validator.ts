import { RegisterData } from '@types';
import Joi from 'joi';

// Register Data Schema
const registerSchema = () => {
  return Joi.object({
    email: Joi.string().email().max(255),
    password: Joi.string()
      .min(8)
      .max(40)
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[\w]{8,40}$/)
      .messages({
        'string.pattern.base': 'The password must have 1 uppercase, 1 lowercase and 1 number at minimum',
        'string.min': 'The password must have minimum 8 characters',
        'string.max': 'The password must have maximum 40 characters',
      }),
  });
};

// Register Validator
export const validateRegisterData = async (data: RegisterData): Promise<RegisterData> => {
  return registerSchema().validateAsync(data);
};
