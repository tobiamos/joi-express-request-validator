const { badRequest } = require('@hapi/boom');
const joi = require('joi');

const validate = (schema) => function validateRequest(req, res, next) {
  const toValidate = {};

  if (!schema) {
    return next();
  }

  ['params', 'body', 'query'].forEach((key) => {
    if (schema[key]) {
      toValidate[key] = req[key];
    }
  });

  const JoiSchema = joi.object(schema);

  const { error, value } = JoiSchema.validate(toValidate);

  if (error) {
    return next(badRequest(error.message, error.details));
  }

  Object.assign(req, value);

  return next();
};

module.exports = validate;
