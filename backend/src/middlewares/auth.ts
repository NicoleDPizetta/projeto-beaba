import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  console.log(token)
  
  if (!token) {
    return res.status(401).json({ auth: false, error: "Token não fornecido" });
  }

  if(!secretKey) {
    return res.status(401).json({error: "Secret não encontrado" })
  }

  try {
    verify(token, secretKey);
    res.json({ auth: true, token: token });
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ auth: false, error: "Não foi possível autenticar o Token" });
  }
}
