import React from "react";
import { Box, Typography, Paper, Button, useTheme } from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { pyApi } from "../../../server/api/api";
import { MoreOptionsButton } from "../modals/MoreOptionsButton";

interface ICardUploadProps {
  id: string;
  id_gdrive: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number | null;
  campos: JSON;
  squad: string;
  data_upload: string;
  template_origem: string;
}

export const CardUpload: React.FC<ICardUploadProps> = ({
  id,
  id_gdrive,
  nome,
  data_upload,
  extensao,
  colunas,
  linhas,
  squad,
  template_origem,
}) => {
  const theme = useTheme();

  const handleBaixar = async () => {
    try {
      const response = await pyApi.get(`/download/${id_gdrive}/${nome}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nome;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Erro ao baixar arquivo: ${nome}`, error);
    }
  };

  return (
    <Paper elevation={1} sx={{ width: "46rem" }}>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        borderBottom={`2px solid`}
        borderColor={theme.palette.primary.light}
      >
        <Typography flex={1} variant={"h5"} color={theme.palette.info.dark}>
          {nome}
        </Typography>

        <MoreOptionsButton children={<></>} />
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
            <Typography variant="body1">Squad:</Typography>
            <Typography variant="body1" color={theme.palette.info.dark}>
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
          bgcolor={theme.palette.info.dark}
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
            <Typography
              variant="body1"
              color={theme.palette.primary.contrastText}
            >
              Template usado: {template_origem}
            </Typography>

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
                {new Date(data_upload).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            id="btn-salvar-template"
            onClick={handleBaixar}
          >
            Baixar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
