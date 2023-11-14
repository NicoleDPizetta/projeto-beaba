import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  CircularProgress,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { pyApi } from "../../../server/api/api";

interface IModalUploadProps {
  usuarioID: string;
  id: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number;
  campos: JSON;
  squad: string;
  criador: string;
  status: boolean;
  data_criacao: string;
}

const repositorios = [
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

export const ModalUpload: React.FC<IModalUploadProps> = ({
  usuarioID,
  id,
  nome,
  extensao,
  colunas,
  linhas,
  campos,
  squad,
  criador,
  status,
  data_criacao,
}) => {
  const theme = useTheme();

  const [repositorio, setRepositorio] = useState("");
  const [arquivoParaUpload, setArquivoParaUpload] = useState<File | null>(null);
  const [open, setModalOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!(repositorio && arquivoParaUpload));
  }, [repositorio, arquivoParaUpload]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSuccessDialog = () => {
    setSuccessDialog(true);
  };

  const closeSuccessDialog = () => {
    setSuccessDialog(false);
  };

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const fazerUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
    setLoadingModal(true);
    event.preventDefault();
    const usuarioLogadoId = usuarioID;

    const arquivo = arquivoParaUpload;
    const repositorio_selecionado = repositorio;
    const templateInfos = {
      id,
      nome,
      status,
      squad,
      criador,
      data_criacao,
      campos,
      extensao,
      colunas,
      linhas,
      usuarioLogadoId,
    };

    const formData = new FormData();
    formData.append("arquivo", arquivo as File);
    formData.append("template", JSON.stringify(templateInfos));
    formData.append(
      "repositorio_selecionado",
      repositorio_selecionado as string
    );

    try {
      const response = await pyApi.post(
        "http://localhost:4000/validar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = response.data;

      if (data.hasOwnProperty("sucesso")) {
        setLoadingModal(false);
        openSuccessDialog();
      } else {
        setLoadingModal(false);
        const errorMessage = response.data.error;
        setErrorMessage(errorMessage);
        setErrorDialogOpen(true);
      }
    } catch (error) {
      setLoadingModal(false);
      setErrorDialogOpen(true);
    }
  };

  return (
    <>
      <Button fullWidth variant="contained" onClick={openModal}>
        Upload
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
              Fazer Upload
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              Selecione o repositório de armazenamento destino e escolha um
              arquivo para ser validado e enviado:
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              marginBottom={6}
            >
              <TextField
                required
                select
                sx={{ width: 250 }}
                size="small"
                label="Repositorio"
                name="repositorio"
                type="text"
                placeholder="Informe o repositório de destino"
                value={repositorio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRepositorio(e.target.value);
                }}
              >
                {repositorios.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                component="label"
              >
                Carregar arquivo
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  style={{ display: "none" }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setArquivoParaUpload(event.target.files?.[0] || null);
                  }}
                />
              </Button>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button
                disabled={isButtonDisabled}
                variant="contained"
                onClick={fazerUpload}
              >
                Enviar
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

      <Dialog open={loadingModal}>
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
              Aguarde...
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
            >
              <CircularProgress />
              <Typography variant="body1" textAlign={"center"} padding={4}>
                Validando...
              </Typography>

            </Box>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={closeErrorDialog}>
        <Box position={"relative"} padding={2} display={"inline-flex"}>
          <Box width={"100%"}>
            <Typography
              variant="h6"
              textAlign={"center"}
              fontWeight={700}
              color={theme.palette.secondary.main}
              borderBottom={"2px solid"}
              borderColor={theme.palette.secondary.main}
              padding={2}
            >
              Erro na validação!
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              {errorMessage}
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button
                variant="contained"
                onClick={closeErrorDialog}
                color="secondary"
              >
                Ok
              </Button>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeErrorDialog}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={successDialog} onClose={closeSuccessDialog}>
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
              Enviado com sucesso!
            </Typography>

            <Typography variant="body1" textAlign={"center"} padding={4}>
              Seu arquivo foi validado e enviado com sucesso!
            </Typography>

            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Button variant="contained" onClick={closeSuccessDialog}>
                Ok
              </Button>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeSuccessDialog}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
