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

interface IModalExcluirTemplateProps {
  id: string;
  nome: string;
}

export const ModalExcluirTemplate: React.FC<IModalExcluirTemplateProps> = ({
  id,
  nome,
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
      const response = await api.delete(`/templates/${id}`);

      if (response.status === 200) {
        console.log("Template excluído com sucesso!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao excluir template:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={openModal}>
        Deletar
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
              Excluir template {nome}?
            </Typography>

            <Typography
              variant="body1"
              textAlign={"center"}
              padding={4}
            >
              Atenção! Esta ação não pode ser desfeita, tem certeza?
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button variant="contained" color="error" onClick={handleDelete}>
                Excluir
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
