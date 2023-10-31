import { PrismaClient } from "@prisma/client";
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
          id,
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
}
