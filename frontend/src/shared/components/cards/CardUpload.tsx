import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, useTheme } from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { api, pyApi } from "../../../server/api/api";
import { MoreOptionsButton } from "../modals/MoreOptionsButton";

interface ICardUploadProps {
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

export const CardUpload: React.FC<ICardUploadProps> = ({
  id,
  nome,
  criador,
  data_upload,
  extensao,
  colunas,
  linhas,
  squad,
  template_origem,
}) => {
  const theme = useTheme();

  const handleBaixar = () => {
    console.log("Baixei!");
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

          <Box
            display={"flex"}
            padding={2}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="body1">
              Template origem: {template_origem}
            </Typography>
          </Box>
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
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundColor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                }}
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
                {data_upload}
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
