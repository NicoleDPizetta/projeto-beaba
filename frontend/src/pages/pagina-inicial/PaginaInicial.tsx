import { useEffect, useState } from "react";
import { GridBase } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { api } from "../../server/api/api";
import { CardTemplateSalvo } from "../../shared/components/cards/CardTemplateSalvo";
import { AuthUsuarioLogado } from "../../middleware";

interface UsuarioLogadoInfos {
  id: string;
}

interface TemplatesSalvosInfos {
  usuario_dono: string;
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

export const PaginaInicial = () => {
  const [templatesSalvos, setTemplatesSalvos] = useState<TemplatesSalvosInfos[]>([]);

  const [templateInfos, setTemplateInfos] = useState<TemplateInfos[]>([]);

  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

  const getUsuarioLogado = async () => {
    const usuario = await AuthUsuarioLogado();
    if (usuario) {
      setUsuarioLogado(usuario);
    } else {
      console.error("AuthUsuarioLogado returned undefined.");
    }
  };

  const getTemplatesInfos = async () => {
    try {
      const usuarioLogadoID = usuarioLogado?.id;
      const response = await api.get("/home", { data: { usuarioId: usuarioLogadoID } });
      const data = response.data;
      setTemplatesSalvos(data);

      const templateIds = templatesSalvos.map((template) => template.template_salvo);
      const templateDetailsResponse = await api.get(`/templates?ids=${templateIds.join(",")}`);
      const templateDetailsData = templateDetailsResponse.data;
      setTemplateInfos(templateDetailsData);
    } catch (error) {
      console.error("Erro ao receber templates salvos:", error);
    }
  };

  useEffect(() => {
    getUsuarioLogado();
    getTemplatesInfos();
  }, []);

  return (
    <LayoutBase>
      <GridBase>
         {templateInfos.map((template, index) => (
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
        ))}
      </GridBase>
    </LayoutBase>
  );
};
