import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { CardTemplate, GridBase } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { api } from "../../server/api/api";

interface TemplateInfos {
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number;
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
  campos: { [key: string]: string };
}

export const PaginaResultadoBusca = () => {
  const location = useLocation();
  const term = new URLSearchParams(location.search).get("busca");
  const [templates, setTemplates] = useState<TemplateInfos[]>([]);

  const getTemplates = useCallback(async () => {
    try {
      if (!term) {
        console.error("Parâmetro de busca ausente na URL");
        return;
      }

      const response = await api.get(`/search/${term}`);
      const data: TemplateInfos[] = response.data;

      const templatesComNomeUsuario = await Promise.all(
        data.map(async (template) => {
          const userResponse = await api.get(`/usuarios/${template.criador}`);
          const user = userResponse.data;

          return {
            ...template,
            criador: user.nome_completo,
          };
        })
      );

      setTemplates(templatesComNomeUsuario);
    } catch (error) {
      console.error("Erro ao receber dados:", error);
    }
  }, [term]);

  useEffect(() => {
    getTemplates();
  }, [getTemplates, term]);

  return (
    <LayoutBase>
      <GridBase>
        {templates.length <= 0 ? (
          <Typography variant="body1">
            Nenhum resultado correspondente à pesquisa
          </Typography>
        ) : (
          templates.map((template) => (
            <CardTemplate
              key={template.id}
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
        )}
      </GridBase>
    </LayoutBase>
  );
};
