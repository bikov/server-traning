import * as Joi from 'joi';

export const validate = (objectToValidate, ...schemas) => Joi.validate(objectToValidate, Joi.object().keys(Object.assign({}, ...schemas)), {abortEarly: false});

export const validateArr = (objectToValidate, itemSchemas) => Joi.validate(objectToValidate, Joi.array().items(itemSchemas), {abortEarly: false});