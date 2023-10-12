import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const usuario = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (!usuario) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const senhaValida = await compare(senha, usuario.senha);

      if (!senhaValida) {
        console.log({ Error });
        return res.status(400).json({ error: "Senha incorreta" });
      }

      if (!secretKey) {
        return res.status(500).json({ error: "Chave secreta não definida" });
      }

      const token = sign({ id: usuario.id }, secretKey, {
        expiresIn: "1d",
      });

      const { id, cargo, matricula, nome_completo, nome_exibicao, permissao, squad } = usuario;

      res.json({ usuario: { id, cargo, matricula, nome_completo, nome_exibicao, permissao, squad }, token });
    } catch (error) {
      console.error("Erro ao fazer login", error);
      res.status(500).json({
        error: "Não foi possível fazer login",
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.json({ auth: false, token: null });
  }
}
