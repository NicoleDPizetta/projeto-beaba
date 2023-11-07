import { useEffect, useState } from "react";
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
}

export const PaginaGerenciarTemplates = () => {
  const [templates, setTemplates] = useState<TemplateInfos[]>([]);

  const getTemplates = async () => {
    try {
      const response = await api.get("/gerenciar-templates");
      const data: TemplateInfos[] = response.data;
      const templatesComNomeUsuario = await Promise.all(
        data.map(async (template) => {
          const userResponse = await api.get(`/usuarios/${template.criador}`);
          const user = userResponse.data;

          return {
            ...template, criador: user.nome_completo
          };
        })
      );
      
      setTemplates(templatesComNomeUsuario);
    } catch (error) {
      console.error("Erro ao receber dados:", error);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <LayoutBase>
      <GridBase>
        {templates.map((template) => (
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
          />
        ))}
      </GridBase>
    </LayoutBase>
  );
};
