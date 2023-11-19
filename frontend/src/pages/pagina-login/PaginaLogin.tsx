import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { AbasLoginCadastro, LogoBox } from "../../shared/components";
import { api } from "../../server/api/api";

interface ApiResponse {
  token?: string;
  error?: string;
}

export const PaginaLogin = () => {
  const theme = useTheme();

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post<ApiResponse>("/login", formData);
      const data = response.data;
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:3000/home";
      } else {
        setError("Falha ao receber Token");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(
          "Não foi possível realizar o login. Tente novamente mais tarde."
        );
      }
      setSnackbarOpen(true);
    }
  };

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
        <AbasLoginCadastro />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="Insira seu email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Senha"
          name="senha"
          type="password"
          placeholder="Insira sua senha"
          value={formData.senha}
          onChange={handleChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Entrar
        </Button>
      </Paper>
    </Box>
  );
};
