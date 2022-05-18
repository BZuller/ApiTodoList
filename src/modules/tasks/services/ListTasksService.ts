import { getCustomRepository } from "typeorm";
import Task from "../typeorm/entities/Task";
import { TaskRepository } from "../typeorm/repositories/TasksRepository";

class ListTaskService{
  public async execute(): Promise<Task[]> {
    const tasksRepository = getCustomRepository(TaskRepository);

    const task = await tasksRepository.find();

    return task;
  }
}

export default ListTaskService;
