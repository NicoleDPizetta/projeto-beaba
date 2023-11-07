import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { api } from "../../../server/api/api";

interface IModalRevogarUsuarioProps {
  id: string;
  userName: string;
}

export const ModalRevogarUsuario: React.FC<IModalRevogarUsuarioProps> = ({
  id,
  userName,
}) => {
  const theme = useTheme();

  const [open, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.delete(`/usuarios/${id}`);

      if (response.status === 200) {
        console.log("Usuário excluído com sucesso!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={openModal}>
        Revogar acesso
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
              Revogar acesso de {userName}?
            </Typography>

            <Typography
              variant="body1"
              textAlign={"center"}
              padding={4}
            >
              <Typography
              variant="h6"
              textAlign={"center"}
            >
              Atenção!
            </Typography>
            O usuário não poderá mais acessar a plataforma, tem certeza?
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button variant="contained" color="error" onClick={handleDelete}>
                Revogar
              </Button>
              <Button variant="contained" onClick={closeModal}>Cancelar</Button>
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
