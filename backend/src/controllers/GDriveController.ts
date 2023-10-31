import { PrismaClient, Uploads } from "@prisma/client";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

export class GDriveController {
  async salvarArquivoNoPrisma(req: Request, res: Response) {
    try {
      const {
        id,
        squad,
        extensao,
        colunas,
        linhas,
        usuarioLogadoId,
        id_gdrive,
        nome_arquivo,
      } = req.body;

      const criador = usuarioLogadoId;
      const template_origem = id;
      const nome = nome_arquivo;

      const novoArquivo = await prisma.uploads.create({
        data: {
          id_gdrive,
          nome,
          extensao,
          colunas,
          linhas,
          squad,
          criador,
          template_origem,
        },
      });
      res.json(novoArquivo);
    } catch (error) {
      console.error("Erro ao salvar arquivo enviado ao Google Drive", error);
      res.status(500).json({
        error: "Não foi possível salvar arquivo enviado ao Google Drive",
      });
    }
  }

  async consultarUploads(req: Request, res: Response) {
    try {
      const usuarioLogadoId = req.params.id;

      const usuario = await prisma.usuarios.findUnique({
        where: { id: usuarioLogadoId },
      });
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const uploads: Uploads[] = await prisma.uploads.findMany({
        where: { criador: usuarioLogadoId },
      });
      if (uploads) {
        res.json(uploads);
      } else {
        res.status(404).json({
          error: "Uploads do usuário não encontrados",
        });
      }
    } catch (error) {
      console.error("Erro ao consultar uploads do usuário ", error);
      res.status(500).json({
        error: "Não foi possível consultar uploads deste usuário ",
      });
    }
  }
}
