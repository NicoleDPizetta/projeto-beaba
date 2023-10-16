import { Box, Paper, TextField, Button, useTheme } from "@mui/material";
import { LogoBox } from "../../shared/components";
import { useState } from "react";
import { api } from "../../server/api/api";

export const PaginaLogin = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", formData) 
      const data = response.data
      console.log(data)

      if(data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = "http://localhost:3000/home";
      } else {
        console.log("Falha ao receber Token")
      }

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
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
        />

        <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
      </Paper>
    </Box>
  );
};
