import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth'

export default function isAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void{
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError ( 'Missing JWT Token!');
  }

  const [, token] = authHeader.split(' ');

  try{
    const decodedToken = verify(token, authConfig.jwt.secret);

    decodedToken;
    return next();
  }catch{
    throw new AppError('JWT Token inválido!');
  }
}
