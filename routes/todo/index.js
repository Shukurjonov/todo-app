const router = require('express').Router();

const Todo = require('../../database/todo');

const { createTodoSchema, updateTodoSchema, deleteTodoSchema } = require('./schema')

const { catchError } = require('../../utils/helper');

const getTodos = catchError(async (req, res, next) => {
  let todoId = req.params.todoId;

  if (todoId) {
    const result = await Todo.getTodo([todoId]);
    return res.status(200).send({
      message: 'Todo',
      data: result
    })
  }

  const result = await Todo.getTodos();
  return res.status(200).send({
    message: 'Todos list',
    data: result
  })
});

const createTodo = catchError(async (req, res, next) => {
  const { error, value } = createTodoSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Todo.createTodo([value.name, value.description, value.todoTime]);

  return res.status(201).send({
    message: 'Todo created',
    data: result
  })
});

const updateTodo = catchError(async (req, res, next) => {
  const { error, value } = updateTodoSchema.validate({ ...req.params, ...req.body });

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  let result = await Todo.updateTodo([
    value.name,
    value.description,
    value.todoTime,
    value.isCompleted,
    value.todoId
  ]);

  return res.status(200).send({
    message: 'Todo updated',
    data: result
  })

})

const deleteTodo = catchError(async (req, res, next) => {
  const { error, value } = deleteTodoSchema.validate(req.params);

  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }
  const result = await Todo.deleteTodo([value.todoId]);

  if (!result.length) {
    return res.status(404).send({
      message: 'Todo not found'
    })
  }

  return res.status(200).send({
    message: 'Todos dateleted',
    data: result
  })
});

router.get('/', getTodos);
router.get('/:todoId', getTodos);
router.post('/', createTodo);
router.put('/:todoId', updateTodo);
router.delete('/:todoId', deleteTodo);

module.exports = router;