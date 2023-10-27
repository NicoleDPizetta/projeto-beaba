import { useEffect, useState } from "react";
import { CardTemplateSalvo } from "../cards/CardTemplateSalvo";
import { Typography } from "@mui/material";
import { api } from "../../../server/api/api";

interface UsuarioLogado {
  id: string;
}
interface TemplatesSalvosID {
  template_salvo: string;
}

interface TemplateInfos {
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number | null;
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
}

export const TemplatesSalvosDoUsuario = ({ id }: UsuarioLogado) => {
  const [templateInfos, setTemplateInfos] = useState<TemplateInfos[]>([]);

  const [templatesSalvos, setTemplatesSalvos] = useState<TemplatesSalvosID[]>([]);

  const getTemplatesSalvos = async () => {
    try {
      const response = await api.get(`/home/${id}`);
      const data = response.data;
      setTemplatesSalvos(data);
    } catch (error) {
      console.error("Erro ao receber templates salvos:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getTemplatesSalvos();
    }
  }, [id]);

  useEffect(() => {
    if (templatesSalvos) {
      const fetchTemplateInfo = async () => {
        const templateInfosArray = [];
        for (const templateSalvo of templatesSalvos) {
          const templateID = templateSalvo.template_salvo;
          try {
            const response = await api.get(`/templates/${templateID}`);
            const templateInfo = response.data;
            templateInfosArray.push(templateInfo);
          } catch (error) {
            console.error(
              `Erro ao receber informações do template ${templateID}:`,
              error
            );
          }
        }
        setTemplateInfos(templateInfosArray);
      };
      fetchTemplateInfo();
    }
  }, [templatesSalvos]);

  return (
    <>
      {templateInfos.length > 0 ? (
        templateInfos.map((template, index) => (
          <CardTemplateSalvo
            key={index}
            id={template.id}
            nome={template.nome}
            criador={template.criador}
            data_criacao={template.data_criacao}
            status={template.status}
            squad={template.squad}
            extensao={template.extensao}
            colunas={template.colunas}
            linhas={template.linhas}
          />
        ))
      ) : (
        <Typography variant="body1">Nenhum template salvo ainda</Typography>
      )}
    </>
  );
};
