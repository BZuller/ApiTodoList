import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { hash } from 'bcrypt';
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  public async execute({name, email, password}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError('Email já cadastrado!')
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
