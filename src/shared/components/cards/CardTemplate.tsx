import * as React from "react";
import { useTheme, Box, Typography, IconButton, Paper } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { LateralDoCard } from "./LateralDoCard";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";

export const CardTemplate: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper elevation={1} sx={{ width: "46rem" }}>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        borderBottom="2px solid"
        borderColor="primary.main"
      >
        <Typography flex={1} variant={"h5"} color="primary">
          Template Nome
        </Typography>
        <IconButton aria-label="settings" id="settings">
          <MoreHorizIcon />
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
          <Typography variant="body1" color={theme.palette.primary.light}>
            Squad
          </Typography>

          <TabelaInfosArquivo />
        </Box>

        <LateralDoCard />
      </Box>
    </Paper>
  );
};
