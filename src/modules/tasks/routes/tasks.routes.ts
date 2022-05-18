import { Router } from 'express'
import TasksController from '../controllers/TasksController'
import {celebrate, Joi, Segments } from 'celebrate';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.index);

tasksRouter.post('/',
  celebrate({
    [Segments.BODY] : {
      name: Joi.string().required(),
      description: Joi.string().required(),
    }
  }),
tasksController.create);

tasksRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
tasksController.update);

tasksRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}),
  tasksController.delete);

export default tasksRouter;
