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
        squad,
      } = req.body;
      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios não preenchidos" });
      }

      const hash_senha = await hash(senha, 8);

      const usuarioJaExiste = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (usuarioJaExiste) {
        return res.status(400).json("Email já existente");
      }

      const novoUsuario = await prisma.usuarios.create({
        data: {
          nome_completo,
          nome_exibicao,
          email,
          matricula,
          cargo,
          senha: hash_senha,
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
      const usuarioID = req.params.id;
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

  async revogarUsuario(req: Request, res: Response) {
    try {
      const usuarioID = req.params.id;
      const usuario: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID },
      });

      if (!usuario) {
        return res.status(404).json({
          error: "ID de usuário não encontrado",
        });
      }
      const novo_nome_exibicao = "ACESSO REVOGADO";
      const nova_senha = "usuario@revogado#QUERO";

      await prisma.usuarios.update({
        where: { id: usuarioID },
        data: {
          nome_exibicao: novo_nome_exibicao,
          senha: nova_senha,
        },
      });

      res.json("Acesso do usuário revogado com sucesso");
    } catch (error) {
      console.error("Erro ao revogar acesso do usuário", error);
      res.status(500).json({
        error: "Não foi possível revogar acesso deste usuário",
      });
    }
  }

  async alterarSenha(req: Request, res: Response) {
    try {
      const usuarioID = req.params.id;
      const novaSenha = req.body.senha;

      const usuarios: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID },
      });
      if (!usuarios) {
        res.status(404).json({
          error: "ID de usuário não encontrado",
        });
        return;
      }

      const hash_senha = await hash(novaSenha, 8);

      const atualizarSenha: Usuarios = await prisma.usuarios.update({
        where: { id: usuarioID },
        data: {
          senha: hash_senha,
        },
      });

      res.json(atualizarSenha);
    } catch (error) {
      console.error("Erro ao alterar senha", error);
      res.status(500).json({
        error: "Não foi possível alterar senha",
      });
    }
  }

  async editarUsuario(req: Request, res: Response) {
    try {
      const usuarioID = req.body.id;
      const { nome_completo, nome_exibicao, email, cargo, permissao, squad } =
        req.body;

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

  async consultarPorToken(req: Request, res: Response) {
    try {
      const usuarioID = res.locals.user;
      const usuarios: Usuarios | null = await prisma.usuarios.findUnique({
        where: { id: usuarioID.id },
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
}
