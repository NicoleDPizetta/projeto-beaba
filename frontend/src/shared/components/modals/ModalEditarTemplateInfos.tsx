import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { api } from "../../../server/api/api";
import { SelectSquads } from "../selects-e-valores/SelectSquads";
import { SelectExtensoes } from "../selects-e-valores/SelectExtensoes";

interface IModalProps {
  id: string;
  nome: string;
}

interface TemplateInfos {
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number;
  squad: string;
  criador: string;
  campos: {};
}

export const ModalEditarTemplateInfos: React.FC<IModalProps> = ({
  id,
  nome,
}) => {
  const theme = useTheme();
  const templateID = id;
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [open, setModalOpen] = useState(false);

  const [nomeTemplate, setNomeTemplate] = useState("");
  const [qntLinhas, setQntLinhas] = useState<number>(0);
  const [selectedExtensao, setSelectedExtensao] = useState("");
  const [selectedSquad, setSelectedSquad] = useState("");
  const [camposInfo, setCamposInfo] = useState<{ [key: string]: string }>({});

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getTemplateInfos = async () => {
    try {
      const response = await api.get(`/templates/${templateID}`);
      const data: TemplateInfos = response.data;
      const templateInfos = data;
      setNomeTemplate(templateInfos.nome);
      setQntLinhas(templateInfos.linhas);
      setSelectedExtensao(templateInfos.extensao);
      setSelectedSquad(templateInfos.squad);
      setCamposInfo(templateInfos.campos);

      console.log(`campos: ${camposInfo}`);
    } catch (error) {
      console.error("Erro ao receber dados:", error);
    }
  };

  useEffect(() => {
    getTemplateInfos();
  }, [templateID]);

  const handleSave = async () => {
    try {
      const dataToSend = {
        id: templateID,
        nome: nomeTemplate,
        extensao: selectedExtensao,
        linhas: qntLinhas,
        squad: selectedSquad,
      };

      console.log(dataToSend);

      const response = await api.put(`/templates/${templateID}`, dataToSend);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={openModal}>
        Editar
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
              Editar template: {nome}
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
                  required
                  fullWidth
                  type="text"
                  placeholder="Digite um nome para o template"
                  value={nomeTemplate}
                  label="Nome do template"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNomeTemplate(e.target.value);
                    setIsSaveButtonDisabled(false);
                  }}
                />
                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  gap={2}
                >
                  <TextField
                    required
                    label="Limite de linhas"
                    type="number"
                    placeholder="Zero (0) para não limitar"
                    helperText={"Zero (0) para não limitar"}
                    inputProps={{ min: 0 }}
                    value={qntLinhas}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setQntLinhas(parseInt(event.target.value, 10));
                      setIsSaveButtonDisabled(false);
                    }}
                  />
                  <SelectSquads
                    value={selectedSquad}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setSelectedSquad(event.target.value as string);
                      setIsSaveButtonDisabled(false);
                    }}
                  />

                  <SelectExtensoes
                    value={selectedExtensao}
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      setSelectedExtensao(event.target.value as string);
                      setIsSaveButtonDisabled(false);
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              marginTop={3}
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
                onClick={handleSave}
              >
                Salvar alterações
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
