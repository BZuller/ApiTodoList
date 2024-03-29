import tasksRouter from '@modules/tasks/routes/tasks.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/tasks', tasksRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
