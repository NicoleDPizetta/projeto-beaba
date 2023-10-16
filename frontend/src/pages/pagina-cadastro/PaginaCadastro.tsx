import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  useTheme,
} from "@mui/material";
import { LogoBox } from "../../shared/components";
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

  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_exibicao: "",
    email: "",
    matricula: "",
    cargo: "",
    senha: "",
    squad: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/cadastrar", formData);
      const data = response.data;
      console.log(data);

      if (data) {
        console.log("Sucesso!");
        window.location.href = "http://localhost:3000/login";
      } else {
        console.log("Falha ao criar usuário");
      }
    } catch (error) {
      alert("Email já cadastrado");
      console.log("Erro ao enviar dados:", error);
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
              type="password"
              placeholder="Confirme sua senha"
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
