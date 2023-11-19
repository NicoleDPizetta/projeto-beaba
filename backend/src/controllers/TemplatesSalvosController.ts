import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Templates_salvos_do_Usuario } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

export class TemplatesSalvosController {
  async salvarTemplate(req: Request, res: Response) {
    try {
      const { usuarioId, templateId } = req.body;

      const usuario = await prisma.usuarios.findUnique({
        where: { id: usuarioId },
      });
      const template = await prisma.templates.findUnique({
        where: { id: templateId },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
      if (!template) {
        return res.status(404).json({ error: "Template não encontrado." });
      }

      const templateJaSalvo = await prisma.templates_salvos_do_Usuario.findFirst({
        where: {
          usario_dono: usuarioId,
          template_salvo: templateId,
        },
      });

      if (templateJaSalvo) {
        return res.status(400).json({ error: "Template já foi salvo anteriormente." });
      }

      const templateSalvo = await prisma.templates_salvos_do_Usuario.create({
        data: {
          usario_dono: usuarioId,
          template_salvo: templateId,
        },
      });

      res.status(200).json(templateSalvo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao salvar o template." });
    }
  }

  async consultarTemplatesSalvos(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await prisma.usuarios.findUnique({
        where: { id: id },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const templatesSalvos: Templates_salvos_do_Usuario[] = await prisma.templates_salvos_do_Usuario.findMany({
          where: { usario_dono: usuario.id },
        });

      res.json(templatesSalvos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao consultar templates salvos." });
    }
  }

  async removerDeTemplatesSalvos(req: Request, res: Response) {
    try {
      const usuarioId = req.params.usuarioId;
      const templateId = req.params.templateId;

      const templateSalvo: Templates_salvos_do_Usuario | null = await prisma.templates_salvos_do_Usuario.findUnique({
        where: {
          usario_dono_template_salvo: {
            usario_dono: usuarioId,
            template_salvo: templateId,
          },
        },
      });

      if (!templateSalvo) {
        return res.status(404).json({ error: 'Template salvo não encontrado.' });
      }

      await prisma.templates_salvos_do_Usuario.delete({
        where: {
          usario_dono_template_salvo: {
            usario_dono: usuarioId,
            template_salvo: templateId,
          },
        },
      });

      res.status(200).json({ message: 'Template salvo removido com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o template salvo.' });
    }
  }
}
