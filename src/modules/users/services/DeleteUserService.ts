import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest{
  id: string;
}

class DeleteUserService{
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);

    if(!user) {
      throw new AppError('Usuário não encontrado!');
    }

    await usersRepository.remove(user);

    return user;
  }
}

export default DeleteUserService;
