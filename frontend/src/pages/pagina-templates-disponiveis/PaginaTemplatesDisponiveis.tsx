import { useEffect, useState } from "react";
import {
  CardTemplate,
  GridBase,
  SelectFiltroSquad,
} from "../../shared/components";
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

export const PaginaTemplatesDisponiveis = () => {
  const [templates, setTemplates] = useState<TemplateInfos[]>([]);
  const [filtroSquad, setFiltroSquad] = useState<string>("Todos");

  const getTemplates = async () => {
    try {
      const response = await api.get("/templates");
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
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const templatesOrdenados = [...templates].sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <LayoutBase>
      <SelectFiltroSquad
        value={filtroSquad}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setFiltroSquad(event.target.value as string);
        }}
        titleText="Templates disponíveis"
      />

      <GridBase>
        {templatesOrdenados
          .filter((template) =>
            filtroSquad !== "Todos" ? template.squad === filtroSquad : true
          )
          .map((template) => (
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
          ))}
      </GridBase>
    </LayoutBase>
  );
};
