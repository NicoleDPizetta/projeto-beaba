import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Usuarios } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

export class UsuariosController {
  async criarNovoUsuario(req: Request, res: Response) {
    try {
      const {
        nome_completo,
        nome_exibicao,
        email,
        matricula,
        cargo,
        senha,
        permissao,
        squad,
      } = req.body;
      const hash_senha = await hash(senha, 8);

      const usuarioJaExiste = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (usuarioJaExiste) {
        return res.status(400).json({ error: "Usuário já cadastrado" });
      }

      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome_completo,
          nome_exibicao,
          email,
          matricula,
          cargo,
          senha: hash_senha,
          permissao,
          squad,
        },
      });
      res.json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar novo usuário", error);
      res.status(500).json({
        error: "Não foi possível criar um novo usuário",
      });
    }
  }

  async consultarTodosUsuarios(req: Request, res: Response) {
    try {
      const usuarios: Usuarios[] = await prisma.usuarios.findMany();
      res.json(usuarios);
    } catch (error) {
      console.error("Erro ao consultar todos os usuários", error);
      res.status(500).json({
        error: "Não foi possível consultar todos os usuários",
      });
    }
  }

  async consultarUsuarioPorID(req: Request, res: Response) {
    try {
      const usuarioID = req.body.id;
      const usuarios: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID },
      });
      if (usuarios) {
        res.json(usuarios);
      } else {
        res.status(404).json({
          error: "ID de usuário não encontrado",
        });
      }
    } catch (error) {
      console.error("Erro ao consultar usuário por ID", error);
      res.status(500).json({
        error: "Não foi possível consultar este ID de usuário",
      });
    }
  }

  async excluirUsuario(req: Request, res: Response) {
    try {
      const usuarioID = req.params.id;
      console.log(usuarioID);
      const usuarios: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID },
      });

      console.log(usuarios?.id);

      if (!usuarios) {
        return res.status(404).json({
          error: "ID de usuário não encontrado",
        });
      }
      await prisma.usuarios.delete({
        where: { id: usuarios.id },
      });
      res.json("Usuário deletado com sucesso");
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
      res.status(500).json({
        error: "Não foi possível excluir este usuário",
      });
    }
  }

  async editarUsuario(req: Request, res: Response) {
    try {
      const usuarioID = req.body.id;
      const {
        nome_completo,
        nome_exibicao,
        email,
        cargo,
        senha,
        permissao,
        squad,
      } = req.body;

      const usuarios: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID },
      });
      if (!usuarios) {
        res.status(404).json({
          error: "ID de usuário não encontrado",
        });
        return;
      }

      const atualizarUsuario: Usuarios = await prisma.usuarios.update({
        where: { id: usuarioID },
        data: {
          nome_completo,
          nome_exibicao,
          email,
          cargo,
          senha,
          permissao,
          squad,
        },
      });

      res.json(atualizarUsuario);
    } catch (error) {
      console.error("Erro ao editar usuário", error);
      res.status(500).json({
        error: "Não foi possível editar este usuário",
      });
    }
  }
}
