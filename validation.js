const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    emailAddress: Joi.string().required().email(),
    identifyNumber: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
