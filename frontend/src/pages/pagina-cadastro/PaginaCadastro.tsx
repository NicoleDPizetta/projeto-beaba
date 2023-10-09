import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import { LogoBox } from "../../shared/components";

const squads = [
  {
    value: "Business TECH",
    label: "Business TECH",
  },
  {
    value: "Cartão",
    label: "Cartão",
  },
  {
    value: "Mercantil",
    label: "Mercantil",
  },
  {
    value: "Mobile",
    label: "Mobile",
  },
  {
    value: "DA",
    label: "DA",
  },
];

export const PaginaCadastro = () => {
  const theme = useTheme();

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={theme.palette.background.default}
    >
      <LogoBox />
      <Paper
        elevation={3}
        component={Box}
        width={"30%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={8}
        gap={4}
      >
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={4}>
          <TextField
            fullWidth
            label="Nome completo"
            type="text"
            placeholder="Informe seu nome completo"
          />

          <TextField
            fullWidth
            label="Nome de exibição"
            type="text"
            placeholder="Informe seu nome de exibição"
            helperText="Este será seu nome visível por todos na plataforma"
          />

          <TextField
            fullWidth
            label="Cargo"
            type="text"
            placeholder="Informe seu cargo"
          />

          <Box
            width={"100%"}
            display={"flex"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TextField
              fullWidth
              label="Matricula"
              type="text"
              placeholder="Informe sua matricula"
            />

            <TextField
              fullWidth
              select
              label="Squad"
              type="text"
              placeholder="Informe sua squad"
            >
              {squads.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Informe seu email"
            />

            <TextField
              fullWidth
              label="Confirme seu email"
              type="email"
              placeholder="Confirme seu email"
            />
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TextField
              fullWidth
              label="Senha"
              type="password"
              placeholder="Insira sua senha"
            />

            <TextField
              fullWidth
              label="Confirme sua senha"
              type="password"
              placeholder="Confirme sua senha"
            />
          </Box>
        </Box>
        <Button variant="contained">Cadastrar</Button>
      </Paper>
    </Box>
  );
};
