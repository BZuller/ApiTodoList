import { Request, Response } from "express";
import CreateTaskService from "../services/CreateTaskService";
import DeleteTaskService from "../services/DeleteTaskService";
import ListTaskService from "../services/ListTasksService";
import UpdateTaskService from "../services/UpdateTaskService";

export default class TasksController{
  public async index(request: Request, response: Response){

    const listTasks = new ListTaskService();

    const tasks = await listTasks.execute();

    return response.json(tasks)
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const {name, description} = request.body;

    const createTask = new CreateTaskService();

    const task = await createTask.execute({
      name,
      description
    })
    return response.json(task);
  }

  public async update (request: Request, response: Response): Promise<Response>{
    const {name, description} = request.body;
    const {id} = request.params;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({
      id,
      name,
      description
    })

    return response.json(task);
  }

  public async delete (request: Request, response: Response): Promise<Response>{
    const {id} = request.params;

    const deleteTask = new DeleteTaskService();

    await deleteTask.execute({id});

    return response.json([])
  }
}
