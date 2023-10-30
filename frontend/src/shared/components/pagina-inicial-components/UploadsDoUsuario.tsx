import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { api } from "../../../server/api/api";
import { Box } from "@mui/system";
import { CardUpload } from "../cards/CardUpload";

interface UsuarioLogado {
  id: string;
}

interface UploadsID {
    template_salvo: string;
}

interface UploadInfos {
  id: string;
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
  /* const [uploadsInfos, setUploadsInfos] = useState<UploadInfos[]>([]);

  const [upload, setUpload] = useState<UploadsID[]>([]);

  const getUploadsDoUsuario = async () => {
    try {
      const response = await api.get(`/home/${id}`);
      const data = response.data;
      setUpload(data);
    } catch (error) {
      console.error("Erro ao receber uploadss salvos:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getUploadsDoUsuario();
    }
  }, [id]); */

  return (
    <Box>
        <CardUpload
            key={"index"}
            id={"id"}
            nome={"nome"}
            criador={"criador"}
            data_upload={"data_upload"}
            squad={"squad"}
            extensao={"extensao"}
            colunas={0}
            linhas={0}
            campos={JSON}
            template_origem={"template_origem"}
          />
    </Box>
  )
};