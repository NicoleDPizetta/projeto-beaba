import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { MoreOptionsButton } from "../modals/MoreOptionsButton";
import { ModalTemplateOptions } from "../modals/ModalTemplateOptions";
import { api } from "../../../server/api/api";
import { AuthUsuarioLogado } from "../../../middleware";
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
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
  campos: { [key: string]: string };
}

export const CardTemplate: React.FC<ICardTemplateProps> = ({
  status,
  nome,
  squad,
  criador,
  data_criacao,
  id,
  extensao,
  colunas,
  linhas,
  campos,
}) => {
  const theme = useTheme();
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "warning">("success");

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

  const salvarTemplate = async () => {
    if (usuarioLogado && id) {
      try {
        const usuarioId = usuarioLogado.id;
        const templateId = id;

        const response = await api.post("/salvar-template", {
          usuarioId,
          templateId,
        });

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Template salvo!");
          setSnackbarOpen(true);
        } else {
          setSnackbarSeverity("warning");
          setSnackbarMessage("Erro ao salvar o template.");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarSeverity("warning");
        setSnackbarMessage("Template já foi salvo anteriormente");
        setSnackbarOpen(true);
      }
    }
  };

  /* Definindo a cor do template de acordo com o status (ativo / inativo) */
  const corTexto = status ? theme.palette.primary.light : theme.palette.info.main;
  const corBorda = status ? theme.palette.primary.main : theme.palette.info.light;
  const corLateral = status ? theme.palette.primary.main : theme.palette.info.main;

  return (
    <Paper elevation={1} sx={{ width: "46rem" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

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

        <MoreOptionsButton
          children={
            <ModalTemplateOptions
              key={id}
              id={id}
              nome={nome}
              status={status}
            />
          }
        />
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
                alt={criador}
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
            <Button
              fullWidth
              variant="contained"
              id="btn-salvar-template"
              onClick={salvarTemplate}
            >
              Salvar
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
