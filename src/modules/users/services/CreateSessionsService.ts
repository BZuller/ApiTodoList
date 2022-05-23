import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'
import User from "../typeorm/entities/User";
import { compare } from 'bcrypt';
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
  user : User;
  token: string;
}

class CreateSessionService{
  public async execute({ email, password}: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('Email ou senha incorretos.', 401)
    }
    const passwordConfirmed = await compare(password, user.password);

    if(!passwordConfirmed) {
      throw new AppError('Email ou senha incorretos.', 401)
    }

    const token = sign({},authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    } )


    return {
      user,
    token};
  }
}

export default CreateSessionService;
