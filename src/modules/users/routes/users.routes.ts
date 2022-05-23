import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import {celebrate, Joi, Segments } from 'celebrate';
import isAuth from '../middlewares/isAuth';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuth, usersController.index);

usersRouter.post('/',
celebrate({
  [Segments.BODY] : {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}),
usersController.create)

usersRouter.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}),
  usersController.delete);

export default usersRouter;
