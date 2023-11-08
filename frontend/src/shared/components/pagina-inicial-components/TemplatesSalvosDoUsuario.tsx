import { useEffect, useState } from "react";
import { CardTemplateSalvo } from "../cards/CardTemplateSalvo";
import { Typography } from "@mui/material";
import { api } from "../../../server/api/api";

interface UsuarioLogado {
  id: string;
}

interface TemplateInfos {
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number;
  campos: JSON;
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
}

export const TemplatesSalvosDoUsuario = ({ id }: UsuarioLogado) => {
  const [templateInfos, setTemplateInfos] = useState<TemplateInfos[]>([]);

  const getTemplatesSalvos = async () => {
    try {
      const response = await api.get(`/home/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Erro ao receber templates salvos:", error);
      return [];
    }
  };
  
  const getTemplateInfo = async (templateID: string) => {
    try {
      const response = await api.get(`/templates/${templateID}`);
      const templateInfo = response.data;
      return templateInfo;
    } catch (error) {
      console.error(`Erro ao receber informações do template ${templateID}:`, error);
      return null;
    }
  };

  const getUsuarioInfo = async (criador: string) => {
    try {
      const response = await api.get(`/usuarios/${criador}`);
      const usuarioInfo = response.data;
      return usuarioInfo.nome_completo;
    } catch (error) {
      console.error(`Erro ao receber informações do usuário ${criador}:`, error);
      return criador;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const templatesSalvos = await getTemplatesSalvos();
      const templateInfosArray: TemplateInfos[] = [];

      for (const templateSalvo of templatesSalvos) {
        const templateInfo = await getTemplateInfo(templateSalvo.template_salvo);
        if (templateInfo) {
          const criador = await getUsuarioInfo(templateInfo.criador);
          templateInfosArray.push({
            ...templateInfo,
            criador,
          });
        }
      }

      setTemplateInfos(templateInfosArray);
    };

    if (id) {
      fetchData();
    }
  });

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
            campos={template.campos}
          />
        ))
      ) : (
        <Typography variant="body1">Nenhum template salvo ainda</Typography>
      )}
    </>
  );
};
