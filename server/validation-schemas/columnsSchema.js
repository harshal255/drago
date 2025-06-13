const Joi = require("joi");

const getAllColumnsSchema = Joi.object().keys({
  board_id: Joi.string().required(),
});

module.exports = { getAllColumnsSchema };
