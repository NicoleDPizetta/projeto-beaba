import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { AbasLoginCadastro, LogoBox } from "../../shared/components";
import { api } from "../../server/api/api";

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

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_exibicao: "",
    email: "",
    confirmarEmail: "",
    matricula: "",
    cargo: "",
    senha: "",
    confirmarSenha: "",
    squad: "",
  });

  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.confirmarEmail) {
      setError("Os campos de email não correspondem!");
      setSnackbarOpen(true);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("Os campos de senha não correspondem!");
      setSnackbarOpen(true);
      return;
    }

    const dataToSend = {
      nome_completo: formData.nome_completo,
      nome_exibicao: formData.nome_exibicao,
      email: formData.email,
      matricula: formData.matricula,
      cargo: formData.cargo,
      senha: formData.senha,
      squad: formData.squad,
    };

    try {
      const response = await api.post("/cadastrar", dataToSend);
      const data = response.data;
      console.log(data);

      if (data) {
        console.log("Sucesso!");
        window.location.href = "http://localhost:3000/login";
      } else {
        setError("Falha ao criar usuário");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(
          "Não foi possível realizar o cadastro. Tente novamente mais tarde."
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

        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={4}>
          <TextField
            required
            fullWidth
            label="Nome completo"
            name="nome_completo"
            type="text"
            placeholder="Informe seu nome completo"
            value={formData.nome_completo}
            onChange={handleChange}
          />

          <TextField
            required
            fullWidth
            label="Nome de exibição"
            name="nome_exibicao"
            type="text"
            placeholder="Informe seu nome de exibição"
            helperText="Este será seu nome visível por todos na plataforma"
            value={formData.nome_exibicao}
            onChange={handleChange}
          />

          <TextField
            required
            fullWidth
            label="Cargo"
            name="cargo"
            type="text"
            placeholder="Informe seu cargo"
            value={formData.cargo}
            onChange={handleChange}
          />

          <Box
            width={"100%"}
            display={"flex"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TextField
              required
              fullWidth
              label="Matricula"
              name="matricula"
              type="text"
              placeholder="Informe sua matricula"
              value={formData.matricula}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              select
              label="Squad"
              name="squad"
              type="text"
              placeholder="Informe sua squad"
              value={formData.squad}
              onChange={handleChange}
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
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              placeholder="Informe seu email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Confirme seu email"
              name="confirmarEmail"
              type="email"
              placeholder="Confirme seu email"
              value={formData.confirmarEmail}
              onChange={handleChange}
            />
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TextField
              required
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              placeholder="Insira sua senha"
              value={formData.senha}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Confirme sua senha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              type="password"
              placeholder="Confirme sua senha"
              onChange={handleChange}
            />
          </Box>
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Paper>
    </Box>
  );
};
