import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { api } from "../../../server/api/api";
import { CardUpload } from "../cards/CardUpload";

interface UsuarioLogado {
  id: string;
}

interface UploadInfos {
  id: string;
  id_gdrive: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number;
  campos: JSON;
  squad: string;
  criador: string;
  data_upload: string;
  template_origem: string;
}

export const UploadsDoUsuario = ({ id }: UsuarioLogado) => {
  const [uploadsInfos, setUploadsInfos] = useState<UploadInfos[]>([]);

  const getUploads = async () => {
    try {
      const response = await api.get<UploadInfos[]>(`/uploads/${id}`);
      const data: UploadInfos[] = response.data;
      const uploadsComTemplateOrigem = await Promise.all(
        data.map(async (upload) => {
          const templateID = upload.template_origem;
          let templateName = upload.template_origem;
          try {
            const templateResponse = await api.get(`/templates/${templateID}`);
            templateName = templateResponse.data.nome;
          } catch (error) {
            console.error(
              `Erro ao obter o nome do template para upload ${upload.id}:`,
              error
            );
          }

          return {
            ...upload,
            template_origem: templateName,
          };
        })
      );

      setUploadsInfos(uploadsComTemplateOrigem);
    } catch (error) {
      console.error("Erro ao receber uploads do usuário logado:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getUploads();
    }
  }, [id]);

  return (
    <>
      {uploadsInfos.length > 0 ? (
        uploadsInfos.map((upload) => (
          <CardUpload
            key={upload.id}
            id={upload.id}
            id_gdrive={upload.id_gdrive}
            nome={upload.nome}
            data_upload={upload.data_upload}
            squad={upload.squad}
            extensao={upload.extensao}
            colunas={upload.colunas}
            linhas={upload.linhas}
            campos={upload.campos}
            template_origem={upload.template_origem}
          />
        ))
      ) : (
        <Typography variant="body1">Nenhum arquivo enviado ainda</Typography>
      )}
    </>
  );
};
