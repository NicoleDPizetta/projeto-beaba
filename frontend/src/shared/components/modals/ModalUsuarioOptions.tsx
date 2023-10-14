import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import { api } from "../../../server/api/api";
import { ModalExcluirUsuario } from "./ModalExcluirUsuario";

interface IModalUsuarioOptionsProps {
  userName: string;
  permissao: string;
  id: string;
}

const permissoes = [
  {
    value: "ADMINISTRADOR",
  },
  {
    value: "CRIADOR",
  },
  {
    value: "PADRAO",
  },
];

export const ModalUsuarioOptions: React.FC<IModalUsuarioOptionsProps> = ({
  userName,
  permissao,
  id,
}) => {
  const theme = useTheme();

  const [selectedPermissao, setSelectedPermissao] = useState(permissao);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPermissao(e.target.value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const novaPermissao = { id: id, permissao: selectedPermissao };
      const response = await api.put(`/usuarios/:id`, novaPermissao);

      if (response.status === 200) {
        console.log("Usuário atualizado com sucesso");
      }
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    }
  };

  return (
    <Box
      width={400}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={4}
    >
      <Typography
        width={"100%"}
        variant="h6"
        textAlign={"center"}
        fontWeight={700}
        color={theme.palette.primary.main}
        borderBottom={"2px solid"}
        borderColor={theme.palette.primary.main}
        padding={2}
      >
        {userName}
      </Typography>

      <Box
        width={"98%"}
        display={"flex"}
        justifyContent={"space-between"}
        gap={12}
      >
        <Box>
          <Button variant="contained">Relatório</Button>
        </Box>

        <Box flex={1}>
          <TextField
            fullWidth
            select
            label="Mudar tipo de permissao"
            name="permissao"
            type="text"
            value={selectedPermissao}
            onChange={handleChange}
          >
            {permissoes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <ModalExcluirUsuario id={id} userName={userName} />
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
