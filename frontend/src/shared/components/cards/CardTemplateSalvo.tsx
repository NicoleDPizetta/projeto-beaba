import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  useTheme,
  Dialog,
} from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { api, pyApi } from "../../../server/api/api";
import { AuthUsuarioLogado } from "../../../middleware";
import { styled } from "@mui/material/styles";

interface UsuarioLogadoInfos {
  id: string;
}

interface ICardTemplateProps {
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number | null;
  campos: JSON;
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
}

const VisualInputEscondido = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [open, setModalOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

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

  const fazerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const usuarioLogadoId = usuarioLogado?.id;

    const arquivo = event.target.files?.[0] || null;
    const templateInfos = {
      id,
      nome,
      status,
      squad,
      criador,
      data_criacao,
      campos,
      extensao,
      colunas,
      linhas,
      usuarioLogadoId,
    };

    const formData = new FormData();
    formData.append("arquivo", arquivo as File);
    formData.append("template", JSON.stringify(templateInfos));

    try {
      const response = await pyApi.post('http://localhost:4000/validar', formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = response.data;
      console.log(data);
      
      if (data.hasOwnProperty("sucesso")) {
        openModal();
      } else {
        const errorMessage = response.data.error;
        console.log(errorMessage)
        setErrorMessage(errorMessage);
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setErrorDialogOpen(true);
      console.error("Error:", error);
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
                {data_criacao}
              </Typography>
            </Box>
          </Box>

          {status && (
            <Box display={"flex"} gap={4}>
              <Button fullWidth variant="contained">
                Baixar
              </Button>

              <Button fullWidth component="label" variant="contained">
                Upload
                <VisualInputEscondido type="file" accept=".xlsx, .xlx, .csv" onChange={fazerUpload} />
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Dialog open={errorDialogOpen} onClose={closeErrorDialog}>
        <Box position={"relative"} padding={2} display={"inline-flex"}>
          <Box width={"100%"}>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={700}
              color={theme.palette.secondary.main}
              borderBottom={"2px solid"}
              borderColor={theme.palette.secondary.main}
              padding={2}
            >
              Erro na validação!
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              {errorMessage}
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button variant="contained" onClick={closeErrorDialog} color="secondary">
                Ok
              </Button>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeErrorDialog}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={open} onClose={closeModal}>
        <Box position={"relative"} padding={2} display={"inline-flex"}>
          <Box width={"100%"}>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={700}
              color={theme.palette.primary.main}
              borderBottom={"2px solid"}
              borderColor={theme.palette.primary.main}
              padding={2}
            >
              Enviado com sucesso!
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              Seu arquivo foi validado e enviado com sucesso!
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button variant="contained" onClick={closeModal}>
                Ok
              </Button>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeModal}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Paper>
  );
};
