import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

class ListUsersService{
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.find();

    return user;
  }
}

export default ListUsersService;
