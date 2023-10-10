import { Box, Paper, TextField, Button, useTheme } from "@mui/material";
import { LogoBox } from "../../shared/components";

export const PaginaLogin = () => {
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
        width={700}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={6}
        gap={4}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          placeholder="Insira seu email"
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
        />

        <Button variant="contained">Entrar</Button>
      </Paper>
    </Box>
  );
};
