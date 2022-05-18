import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Task from "../typeorm/entities/Task";
import { TaskRepository } from "../typeorm/repositories/TasksRepository";

interface IRequest{
  id: string;
  name: string;
  description: string;
}

class UpdateTaskService{
  public async execute({name, description, id}: IRequest): Promise<Task> {
    const tasksRepository = getCustomRepository(TaskRepository);
    const task = await tasksRepository.findOne(id);

    if(!task) {
      throw new AppError('Task não encontrada')
    }
    const taskExists = await tasksRepository.findByName(name);
    if(taskExists && name != task.name) {
      throw new AppError ('Já existe uma task com este nome!')
    }

    task.name = name;
    task.description = description;

    await tasksRepository.save(task);

    return task;
  }
}

export default UpdateTaskService;
