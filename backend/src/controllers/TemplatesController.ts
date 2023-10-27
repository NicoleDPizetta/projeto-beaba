import { PrismaClient, Templates_salvos_do_Usuario } from "@prisma/client";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Templates } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

export class TemplatesController {
  async criarNovoTemplate(req: Request, res: Response) {
    try {
      const {
        nome,
        extensao,
        colunas,
        linhas,
        campos,
        status,
        criador,
        squad,
      } = req.body;
      const novoTemplate = await prisma.templates.create({
        data: {
          nome,
          extensao,
          colunas,
          linhas,
          campos,
          status,
          criador,
          squad,
        },
      });
      res.json(novoTemplate);
    } catch (error) {
      console.error("Erro ao criar novo template", error);
      res.status(500).json({
        error: "Não foi possível criar um novo template",
      });
    }
  }

  async consultarTemplatePorID(req: Request, res: Response) {
    try {
      const templateID = req.params.id;
      const template: Templates | null = await prisma.templates.findUnique({
        where: { id: templateID },
      });
      if (template) {
        res.json(template);
      } else {
        res.status(404).json({
          error: "ID do template não encontrado",
        });
      }
    } catch (error) {
      console.error("Erro ao consultar template por ID", error);
      res.status(500).json({
        error: "Não foi possível consultar este ID de template",
      });
    }
  }

  async consultarTemplatesAtivos(req: Request, res: Response) {
    try {
      const templatesAtivos: Templates[] = await prisma.templates.findMany({
        where: { status: true },
      });
      res.json(templatesAtivos);
    } catch (error) {
      console.error("Erro ao consultar todos os templates ativos", error);
      res.status(500).json({
        error: "Não foi possível consultar todos os templates ativos",
      });
    }
  }

  async consultarTemplatesInativos(req: Request, res: Response) {
    try {
      const templatesAtivos: Templates[] = await prisma.templates.findMany({
        where: { status: false },
      });
      res.json(templatesAtivos);
    } catch (error) {
      console.error("Erro ao consultar todos os templates inativos", error);
      res.status(500).json({
        error: "Não foi possível consultar todos os templates inativos",
      });
    }
  }

  async excluirTemplate(req: Request, res: Response) {
    try {
      const templateID = req.params.id;
      const template: Templates | null = await prisma.templates.findUnique({
        where: { id: templateID },
      });

      if (!template) {
        res.status(404).json({error: "ID do template não encontrado"});
      } else {
        await prisma.templates_salvos_do_Usuario.deleteMany({
          where: {
            template_salvo: template.id,
          },
        });
        await prisma.templates.delete({
          where: { id: template.id },
        });
        res.json("Template deletado com sucesso");
      }
      await prisma.$disconnect();
    } catch (error) {
      console.error("Erro ao excluir template", error);
      res.status(500).json({
        error: "Não foi possível excluir este template",
      });
    }
  }

  async editarTemplate(req: Request, res: Response) {
    try {
      const templateID = req.body.id;
      const {
        nome,
        extensao,
        colunas,
        linhas,
        campos,
        status,
        criador,
        squad,
      } = req.body;

      const template: Templates | null = await prisma.templates.findUnique({
        where: { id: templateID },
      });
      if (!template) {
        res.status(404).json({
          error: "ID de usuário não encontrado",
        });
        return;
      }

      const atualizarTemplate: Templates = await prisma.templates.update({
        where: { id: templateID },
        data: {
          nome,
          extensao,
          colunas,
          linhas,
          campos,
          status,
          criador,
          squad,
        },
      });
      res.json(atualizarTemplate);
    } catch (error) {
      console.error("Erro ao editar este template", error);
      res.status(500).json({
        error: "Não foi possível editar este template",
      });
    }
  }
}
