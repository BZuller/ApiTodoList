import tasksRouter from '@modules/tasks/routes/tasks.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/tasks', tasksRouter)
routes.use('/users', usersRouter)

export default routes;
