import * as React from "react";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { LateralDoCard } from "./LateralDoCard";
import { TabelaInfosArquivo } from "../tabela-infos-arquivo/TabelaInfosArquivo";

export const CardTemplate: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ maxWidth: "46rem" }}
      display="flex"
      justifyContent="space-between"
      bgcolor={theme.palette.background.paper}
      borderRadius="1rem"
    >
      <Box flex={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="primary">
            Template Nome
          </Typography>
          <IconButton aria-label="settings" id="settings">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" color={theme.palette.primary.light}>
            Squad
          </Typography>

        <TabelaInfosArquivo/>
      </Box>

      <LateralDoCard />
    </Box>
  );
};
