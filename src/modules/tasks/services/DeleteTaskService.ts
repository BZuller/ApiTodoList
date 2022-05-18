import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Task from "../typeorm/entities/Task";
import { TaskRepository } from "../typeorm/repositories/TasksRepository";

interface IRequest{
  id: string;
}

class DeleteTaskService{
  public async execute({ id }: IRequest): Promise<Task> {
    const tasksRepository = getCustomRepository(TaskRepository);
    const task = await tasksRepository.findOne(id);

    if(!task) {
      throw new AppError('Task não encontrada!');
    }

    await tasksRepository.remove(task);

    return task;
  }
}

export default DeleteTaskService;
