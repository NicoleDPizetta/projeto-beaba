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
import { SelectSquads } from "../selects-e-valores/SelectSquads";

interface IModalEditarMeuPerfilProps {
  id: string;
  nome_completo: string;
  nome_exibicao: string;
  matricula: string;
  email: string;
  cargo: string;
  squad: string;
}

export const ModalEditarMeuPerfil: React.FC<IModalEditarMeuPerfilProps> = ({
  id,
  nome_completo,
  nome_exibicao,
  matricula,
  email,
  cargo,
  squad,
}) => {
  const theme = useTheme();

  const [newNomeCompleto, setNewNomeCompleto] = useState(nome_completo);
  const [newNomeExibicao, setNewNomeExibicao] = useState(nome_exibicao);
  const [newMatricula, setNewMatricula] = useState(matricula);
  const [newEmail, setNewEmail] = useState(email);
  const [newCargo, setNewCargo] = useState(cargo);
  const [selectedSquad, setSelectedSquad] = useState(squad);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [open, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSquad(event.target.value as string);
    setIsSaveButtonDisabled(false);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = {
        id: id,
        nome_completo: newNomeCompleto,
        nome_exibicao: newNomeExibicao,
        matricula: newMatricula,
        email: newEmail,
        cargo: newCargo,
        squad: selectedSquad,
      };

      const response = await api.put(`/usuarios/${id}`, formData);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Editar perfil
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
              Insira as novas informações:
            </Typography>

            <Box
              width={"32rem"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
              padding={4}
            >
              <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
              >
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Seu nome completo"
                  label="Nome completo"
                  variant="outlined"
                  value={newNomeCompleto}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewNomeCompleto(event.target.value);
                    setIsSaveButtonDisabled(false);
                  }}
                />

                <TextField
                  fullWidth
                  type="text"
                  placeholder="Nome de exibição na plataforma"
                  label="Nome de exibição"
                  variant="outlined"
                  value={newNomeExibicao}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewNomeExibicao(event.target.value);
                    setIsSaveButtonDisabled(false);
                  }}
                />

                <TextField
                  fullWidth
                  type="text"
                  placeholder="Informe seu novo email"
                  label="Email"
                  variant="outlined"
                  value={newEmail}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewEmail(event.target.value);
                    setIsSaveButtonDisabled(false);
                  }}
                />

                <TextField
                  fullWidth
                  type="text"
                  placeholder="Seu cargo"
                  label="Cargo"
                  variant="outlined"
                  value={newCargo}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewCargo(event.target.value);
                    setIsSaveButtonDisabled(false);
                  }}
                />

                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    type="text"
                    placeholder="Matricula"
                    label="Matricula"
                    variant="outlined"
                    value={newMatricula}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setNewMatricula(event.target.value);
                      setIsSaveButtonDisabled(false);
                    }}
                  />
                  <SelectSquads
                    value={selectedSquad}
                    onChange={handleSelectChange}
                  />
                </Box>
              </Box>

              <Box
                width={"80%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeModal}
                >
                  Cancelar
                </Button>

                <Button
                  disabled={isSaveButtonDisabled}
                  variant="contained"
                  onClick={handleSalvar}
                >
                  Salvar
                </Button>
              </Box>
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
