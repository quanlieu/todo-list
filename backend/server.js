const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const { faker } = require('@faker-js/faker');

const { API_PORT } = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
faker.seed(1);
let todoList = [
  {
    uuid: 'abc',
    title: 'Go to art supply store',
    note: 'Get there before it closing time which is 6PM',
    done: true,
  },
  {
    uuid: 'def',
    title: 'Buy a power bank',
    note: 'A power bank with usb c port and wireless charge',
    done: false,
  },
];

// Route
app.get('/api/todos', (req, res) => res.json(todoList));

app.get('/api/todos/:uuid', (req, res, next) => {
  const todo = todoList.find((v) => v.uuid === req.params.uuid);
  if (!todo) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  return res.json(todo);
});

app.post('/api/todos', (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(30).required(),
    note: Joi.string().allow('').optional(),
  });
  const { error: validationError } = Joi.validate(req.body, schema);
  if (validationError) {
    const err = new Error('Bad request');
    err.status = 400;
    return next(err);
  }
  if (req.body.title === 'invalid') {
    const err = new Error('Bad request');
    err.status = 400;
    return next(err);
  }
  const todo = {
    uuid: faker.datatype.uuid(),
    title: req.body.title,
    note: req.body.note || '',
    done: false,
  };
  todoList.unshift(todo);
  return res.status(200).send(todo);
});

app.patch('/api/todos/:uuid', (req, res, next) => {
  const todo = todoList.find((v) => v.uuid === req.params.uuid);
  if (!todo) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  if (req.body.title !== undefined) {
    todo.title = req.body.title;
  }
  if (req.body.note !== undefined) {
    todo.note = req.body.note;
  }
  if (req.body.done !== undefined) {
    todo.done = req.body.done;
  }
  return res.status(200).send(todo);
});

app.delete('/api/todos/:uuid', (req, res, next) => {
  const todo = todoList.find((v) => v.uuid === req.params.uuid);
  if (!todo) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  todoList = todoList.filter((v) => v.uuid !== req.params.uuid);
  return res.status(204).send();
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

app.listen(API_PORT, () =>
  console.log(`Your app is listening on port ${API_PORT}`)
);
