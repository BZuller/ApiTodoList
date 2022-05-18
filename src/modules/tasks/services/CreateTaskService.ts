import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Task from "../typeorm/entities/Task";
import { TaskRepository } from "../typeorm/repositories/TasksRepository";

interface IRequest{
  name: string;
  description: string;
}

class CreateTaskService{
  public async execute({name, description}: IRequest): Promise<Task> {
    const tasksRepository = getCustomRepository(TaskRepository);
    const taskExists = await tasksRepository.findByName(name);

    if(taskExists) {
      throw new AppError('Task já criada!')
    }
    const task = tasksRepository.create({
      name,
      description
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
