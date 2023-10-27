import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, IconButton, useTheme } from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { api } from "../../../server/api/api";
import { AuthUsuarioLogado } from "../../../middleware";

interface UsuarioLogadoInfos {
  id: string;
}

interface ICardTemplateProps {
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

export const CardTemplateSalvo: React.FC<ICardTemplateProps> = ({
  status,
  nome,
  squad,
  criador,
  data_criacao,
  id,
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
      const response = await api.delete(`/home/${usuarioId}/${templateId}`)

      if(response.status = 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao excluir template salvo:', error);
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

              <Button fullWidth variant="contained">
                Upload
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
