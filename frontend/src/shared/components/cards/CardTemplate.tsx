import React from "react";
import { useTheme, Box, Typography, Paper, Button } from "@mui/material";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import { MoreOptionsButton } from "../modals/MoreOptionsButton";
import { ModalTemplateOptions } from "../modals/ModalTemplateOptions";

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

export const CardTemplate: React.FC<ICardTemplateProps> = ({ status, nome, squad, criador, data_criacao, id, extensao, colunas, linhas }) => {
  const theme = useTheme();

  /* Definindo a cor do template de acordo com o status (ativo / inativo) */
  const corTexto = status ? theme.palette.primary.light : theme.palette.info.main;
  const corBorda = status ? theme.palette.primary.main : theme.palette.info.light;
  const corLateral = status ? theme.palette.primary.main : theme.palette.info.main;
  const btnText = status ? "Salvar" : "Ativar";

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

        <MoreOptionsButton children={<ModalTemplateOptions/>}/>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          flex={2}
          padding={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={1}
        >
          <Typography variant="body1" color={corLateral}>
            {squad}
          </Typography>

          <TabelaInfosArquivo key={id} extensao={extensao} colunas={colunas} linhas={linhas} />
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
                  backgroundColor: (Theme) =>
                    Theme.palette.primary.contrastText,
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
                sx={{ color: (Theme) => Theme.palette.primary.contrastText }}
              />
              <Typography
                variant="body1"
                color={theme.palette.primary.contrastText}
              >
                {data_criacao}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Grid3x3OutlinedIcon
                fontSize="medium"
                color="info"
                sx={{ color: (Theme) => Theme.palette.primary.contrastText }}
              />
              <Typography
                variant="body1"
                color={theme.palette.primary.contrastText}
              >
                {id}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            aria-label="add to favorites"
            variant="contained"
            id="btn-salvar-template"
          >
            {btnText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
