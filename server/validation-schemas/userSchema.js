const Joi = require("joi");

const registerUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = registerUserSchema;
