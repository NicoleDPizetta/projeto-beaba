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
import { ModalNovaSenha } from "./ModalNovaSenha";

interface IModalLiberarAcessoUsuarioProps {
  id: string;
  userName: string;
}

export const ModalLiberarAcessoUsuario: React.FC<
  IModalLiberarAcessoUsuarioProps
> = ({ id, userName }) => {
  const theme = useTheme();

  const [open, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={openModal}>
        Liberar acesso
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
              Liberar acesso de {userName}?
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              <Typography variant="h6" textAlign={"center"}>
                Atenção!
              </Typography>
              Você precisa fornecer a nova senha ao usuário para que ele possa
              acessar novamente a plataforma. Solicite que ele a altere depois.
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <ModalNovaSenha key={id} id={id} userName={userName} />
              <Button variant="contained" onClick={closeModal}>
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
