const Joi = require("joi");

const createBoardSchema = Joi.object().keys({
  title: Joi.string().required(),
});

const updateBoardSchema = Joi.object().keys({
  title: Joi.string().required(),
  board_id: Joi.string().required(),
});

const deleteBoardSchema = Joi.object().keys({
  board_id: Joi.string().required(),
});

module.exports = { createBoardSchema, updateBoardSchema, deleteBoardSchema };
