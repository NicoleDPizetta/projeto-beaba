import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { api } from "../../../server/api/api";
import { Box } from "@mui/system";
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
  linhas: number | null;
  campos: JSON;
  squad: string;
  criador: string;
  data_upload: string;
  template_origem: string;
}

export const UploadsDoUsuario = ({ id }: UsuarioLogado) => {
  const usuarioId = id;
  const [uploadsInfos, setUploadsInfos] = useState<UploadInfos[]>([]);

  const getUploads = async () => {
    try {
      const response = await api.get<UploadInfos[]>(`/uploads/${usuarioId}`);
      const data = response.data;
      setUploadsInfos(data);
    } catch (error) {
      console.error("Erro ao receber uploads do usuário logado:", error);
    }
  };

  useEffect(() => {
    getUploads();
  }, [usuarioId]);

  return (
    <Box>
      {uploadsInfos.length > 0 ? (
        uploadsInfos.map((upload) => (
          <CardUpload
            key={upload.id}
            id={upload.id}
            id_gdrive={upload.id_gdrive}
            nome={upload.nome}
            criador={upload.criador}
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
    </Box>
  );
};
