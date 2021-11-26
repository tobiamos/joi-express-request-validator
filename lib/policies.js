const joi = require('joi');

const register = {
  body: {
    name: joi.string().min(2).max(150).required()
      .messages({
        'any.required': 'Name is required',
        'string.min': 'Name must be at least two characters long',
        'string.max': 'Name cannot be more than 150 characters long',
      }),
    email: joi.string().email().required().messages({
      'any.required': 'Email is required',
    }),
    password: joi.string().min(6).max(200).required()
      .messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be at most 200 characters long',
      }),
    organization: joi.string().min(2).max(200)
      .required()
      .messages({
        'any.required': 'Name of Organization is required',
      }),
  },
};
module.exports = register;
