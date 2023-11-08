import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { api } from "../../../server/api/api";

interface IModalEditarMinhaSenhaProps {
  id: string;
}

export const ModalEditarMinhaSenha: React.FC<IModalEditarMinhaSenhaProps> = ({
  id,
}) => {
  const theme = useTheme();

  const [newPassword, setNewPassword] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const [open, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setIsSaveButtonDisabled(event.target.value === "");
  };

  const handleNovaSenha = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const novoAcesso = { senha: newPassword };
      const response = await api.put(`/alterar-senha/${id}`, novoAcesso);

      if (response.status === 200) {
        console.log("Sucesso ao salvar nova senha de acesso!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao salvar nova senha de acesso:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={openModal}>
        Alterar senha
      </Button>

      <Dialog open={open} onClose={closeModal}>
        <Box position={"relative"} padding={2} display={"inline-flex"}>
          <Box width={"100%"}>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={700}
              color={theme.palette.primary.main}
              borderBottom={"2px solid"}
              borderColor={theme.palette.primary.main}
              padding={2}
            >
              Insira uma nova senha:
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                gap={2}
                margin={4}
              >
                <TextField
                  type="password"
                  value={newPassword}
                  onChange={handleInputChange}
                  placeholder="Nova Senha"
                />
                <Button
                  variant="contained"
                  onClick={handleNovaSenha}
                  disabled={isSaveButtonDisabled}
                >
                  Salvar
                </Button>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                Cancelar
              </Button>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeModal}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
