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
import { ModalRevogarUsuario } from "./ModalRevogarUsuario";
import { ModalLiberarAcessoUsuario } from "./ModalLiberarAcessoUsuario";

interface IModalUsuarioOptionsProps {
  userName: string;
  userNickName: string;
  permissao: string;
  id: string;
}

const permissoes = [
  {
    value: "PADRAO",
  },
  {
    value: "CRIADOR",
  },
  {
    value: "ADMINISTRADOR",
  },
];

export const ModalUsuarioOptions: React.FC<IModalUsuarioOptionsProps> = ({
  userName,
  userNickName,
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
        window.location.reload();
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
      >
          <TextField
            fullWidth
            select
            label="Mudar tipo de permissao"
            name="permissao"
            type="text"
            value={selectedPermissao}
            onChange={handleChange}
          >
            {permissoes.map((permissao) => (
              <MenuItem key={permissao.value} value={permissao.value}>
                {permissao.value}
              </MenuItem>
            ))}
          </TextField>
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        {userNickName === "ACESSO REVOGADO" ? (
          <ModalLiberarAcessoUsuario id={id} userName={userName} />
        ) : (
          <ModalRevogarUsuario id={id} userName={userName} />
        )}

        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
