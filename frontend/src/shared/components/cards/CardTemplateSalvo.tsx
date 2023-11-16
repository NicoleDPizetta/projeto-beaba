import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { api, pyApi } from "../../../server/api/api";
import { AuthUsuarioLogado } from "../../../middleware";
import { ModalUpload } from "../modals/ModalUpload";
import { ModalVisualizarCampos } from "../modals/ModalVisualizarCampos";

interface UsuarioLogadoInfos {
  id: string;
}

interface ICardTemplateProps {
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

export const CardTemplateSalvo: React.FC<ICardTemplateProps> = ({
  status,
  nome,
  squad,
  criador,
  data_criacao,
  id,
  campos,
  extensao,
  colunas,
  linhas,
}) => {
  const theme = useTheme();

  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

  const getUsuarioLogado = async () => {
    const usuario = await AuthUsuarioLogado();
    if (usuario) {
      setUsuarioLogado(usuario);
    } else {
      console.error("AuthUsuarioLogado returned undefined.");
    }
  };

  useEffect(() => {
    getUsuarioLogado();
  }, []);

  const removerTemplate = async () => {
    const usuarioId = usuarioLogado?.id;
    const templateId = id;

    try {
      const response = await api.delete(`/home/${usuarioId}/${templateId}`);

      if ((response.status = 200)) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao excluir template salvo:", error);
    }
  };

  const handleBaixarTemplate = async () => {
    try {
      /* Consultar template por ID Typescript */
      const templateID = id;
      const responseTS = await api.get(`/templates/${templateID}`);
      const templateData = responseTS.data;

      if (templateData) {
        const responsePY = await pyApi.post(
          `/template-download`,
          templateData,
          {
            responseType: "blob",
          }
        );

        const { extensao, nome } = templateData;
        let mimeType;

        if (extensao === ".xlsx") {
          mimeType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else if (extensao === ".xls") {
          mimeType = "application/vnd.ms-excel";
        } else if (extensao === ".csv") {
          mimeType = "text/csv";
        } else {
          console.error("Extensão de arquivo desconhecida");
          return;
        }

        const blob = new Blob([responsePY.data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = nome + extensao;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Erro ao baixar template: ${nome}`, error);
    }
  };

  /* Definindo a cor do template de acordo com o status (ativo / inativo) */
  const corTexto = status ? theme.palette.primary.light : theme.palette.info.main;
  const corBorda = status ? theme.palette.primary.main : theme.palette.info.light;
  const corLateral = status ? theme.palette.primary.main : theme.palette.info.main;

  return (
    <Paper elevation={1} sx={{ width: "46rem" }}>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        borderBottom={`2px solid ${corBorda}`}
      >
        <Typography flex={1} variant={"h5"} color={corTexto}>
          {nome}
        </Typography>

        <IconButton onClick={removerTemplate}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          flex={2}
          padding={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={1}
        >
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography variant="body2">Squad:</Typography>
            <Typography variant="body1" color={corLateral}>
              {squad}
            </Typography>
          </Box>

          <TabelaInfosArquivo
            key={id}
            extensao={extensao}
            colunas={colunas}
            linhas={linhas}
          />

          <ModalVisualizarCampos key={id+"visualizar-campos"} id={id} nome={nome} campos={campos} />
        </Box>

        <Box
          flex={1}
          bgcolor={corLateral}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyItems="space-between"
          padding="2rem"
          borderRadius="0 0 .3rem 0"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={3}
            marginBottom={4}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundColor: theme.palette.primary.contrastText,
                  color: { corLateral },
                }}
                aria-label="avatar-user"
                alt="Remy Sharp"
                src="/broken-image.jpg"
              />
              <Typography
                variant="body1"
                color={theme.palette.primary.contrastText}
              >
                {criador}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthOutlinedIcon
                fontSize="medium"
                color="info"
                sx={{ color: theme.palette.primary.contrastText }}
              />
              <Typography
                variant="body1"
                color={theme.palette.primary.contrastText}
              >
                {new Date(data_criacao).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {status && (
            <Box display={"flex"} gap={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleBaixarTemplate}
              >
                Baixar
              </Button>

              <ModalUpload
                key={"modal-upload"}
                usuarioID={usuarioLogado?.id || ""}
                id={id}
                nome={nome}
                extensao={extensao}
                colunas={colunas}
                linhas={linhas}
                campos={campos}
                squad={squad}
                criador={criador}
                status={status}
                data_criacao={data_criacao}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
