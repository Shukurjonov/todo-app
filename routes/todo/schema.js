const Joi = require('joi');

const updateTodoSchema = Joi.object({
  todoId: Joi.number().required(),
  name: Joi.string().min(3).max(20),
  description: Joi.string().min(0).max(150),
  todoTime: Joi.date(),
  isCompleted: Joi.boolean()
});

const createTodoSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(0).max(150).required(),
  todoTime: Joi.date().required()
});

const deleteTodoSchema = Joi.object({
  todoId: Joi.number().required(),
});

module.exports = {
  updateTodoSchema,
  createTodoSchema,
  deleteTodoSchema
};