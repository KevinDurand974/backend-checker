import { Music, User } from '@types';
import Joi from 'joi';

// Register Data Schema
const registerSchema = () => {
  return Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string()
      .min(8)
      .max(40)
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[\w]{8,40}$/)
      .required()
      .messages({
        'string.pattern.base': 'The password must have 1 uppercase, 1 lowercase and 1 number at minimum',
        'string.min': 'The password must have minimum 8 characters',
        'string.max': 'The password must have maximum 40 characters',
      }),
  });
};

// Register Data Schema
const musicSchema = (presence = false) => {
  return Joi.object({
    artist: Joi.string().presence(presence ? 'required' : 'optional'),
    title: Joi.string().presence(presence ? 'required' : 'optional'),
  });
};

// Register Validator
export const validateRegisterData = async (data: Partial<User>): Promise<User> => {
  return registerSchema().validateAsync(data);
};

// Music Validator
export const validateMusicData = async (data: Partial<Music>): Promise<Music> => {
  return musicSchema(true).validateAsync(data);
};

// Update Music Validator
export const validateUpdateMusicData = async (data: Partial<Music>): Promise<Music> => {
  return musicSchema().validateAsync(data);
};
