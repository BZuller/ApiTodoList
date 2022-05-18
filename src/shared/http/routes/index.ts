import tasksRouter from '@modules/tasks/routes/tasks.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/tasks', tasksRouter)

export default routes;
