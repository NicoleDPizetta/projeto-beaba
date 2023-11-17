import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SelectTiposDados } from "../selects-e-valores/SelectTiposDados";
import { api } from "../../../server/api/api";
import { NovoCampo } from "../criar-template-components/NovoCampo";

interface IModalProps {
  id: string;
  nome: string;
  colunas: number;
  campos: { [key: string]: string };
}

export const ModalEditarTemplateCampos: React.FC<IModalProps> = ({
  id,
  nome,
  colunas,
  campos,
}) => {
  const theme = useTheme();
  const [qntColunas, setQntColunas] = useState<number>(0);
  const [qntCampos, setQntCampos] = useState<number>(0);
  const [camposInfo, setCamposInfo] = useState(campos);
  const [novosCampos, setNovosCampos] = useState<{ [key: string]: string }>({});
  const [tiposDadosCampos, setTiposDadosCampos] = useState(campos);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [campoASerExcluido, setCampoASerExcluido] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openConfirmar, setOpenConfirmar] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  const closeModalConfirmar = () => setOpenConfirmar(false);

  const openModalConfirmar = (nomeColuna: string) => {
    setCampoASerExcluido(nomeColuna);
    setOpenConfirmar(open);
  };

  const handleQuantidadeCamposChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQntCampos(parseInt(event.target.value, 10));
  };

  const handleCampoChange = (campo: string, tipoDado: string) => {
    setCamposInfo((prevCamposInfo) => ({
      ...prevCamposInfo,
      [campo]: tipoDado,
    }));
    setIsSaveButtonDisabled(false);
  };

  const excluirCampo = () => {
    setOpenConfirmar(false);
    const nomeColuna = campoASerExcluido;
    const novosCamposInfo = { ...camposInfo };
    delete novosCamposInfo[nomeColuna];
    setCamposInfo(novosCamposInfo);

    const novosNovosCampos = { ...novosCampos };
    delete novosNovosCampos[nomeColuna];
    setNovosCampos(novosNovosCampos);

    setIsSaveButtonDisabled(false);
  };

  const handleTipoChange = (nomeColuna: string, value: string) => {
    setCamposInfo((prevCampos) => ({
      ...prevCampos,
      [nomeColuna]: value,
    }));
    setIsSaveButtonDisabled(false);
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        id: id,
        colunas:
          Object.keys(camposInfo).length + Object.keys(novosCampos).length,
        campos: { ...camposInfo, ...novosCampos },
      };

      const response = await api.put(`/templates/${id}`, dataToSend);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  useEffect(() => {
    setCamposInfo(campos);
    setQntColunas(colunas);
  }, [campos]);

  return (
    <>
      <Button variant="contained" onClick={openModal}>
        Editar campos
      </Button>

      <Dialog maxWidth="md" fullWidth open={open} onClose={closeModal}>
        <Box
          width={"96%"}
          position={"relative"}
          padding={2}
          display={"inline-flex"}
        >
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
              Editar campos do template: {nome}
            </Typography>

            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
              padding={4}
            >
              <Box width={"100%"}>
                {Object.entries(camposInfo).map(([nomeColuna, tipoDado]) => (
                  <Box
                    width={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    paddingY={2}
                    gap={2}
                  >
                    <Typography flex={1} variant="body1">
                      {nomeColuna}
                    </Typography>

                    <SelectTiposDados
                      value={tiposDadosCampos[nomeColuna]}
                      onChange={(
                        event: React.ChangeEvent<{ value: unknown }>
                      ) => {
                        const selectedTipoDados = event.target.value as string;
                        handleTipoChange(nomeColuna, selectedTipoDados);
                        setTiposDadosCampos((prevTiposDados) => ({
                          ...prevTiposDados,
                          [nomeColuna]: selectedTipoDados,
                        }));
                      }}
                    />

                    <Box key={nomeColuna}>
                      <IconButton
                        onClick={() => {
                          openModalConfirmar(nomeColuna);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box margin={2}>
              <Divider flexItem />
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                paddingY={4}
              >
                <Typography variant="body1">
                  Quantidade original de colunas: {qntColunas}
                </Typography>

                <TextField
                  type="number"
                  label="Adicionar novas colunas"
                  placeholder="Digite apenas números"
                  name="novas-colunas"
                  value={qntCampos}
                  onChange={handleQuantidadeCamposChange}
                  inputProps={{ min: 0 }}
                />
              </Box>

              {Array.from({ length: qntCampos }).map((campo, index) => (
                <NovoCampo
                  key={index}
                  onCampoChange={(nomeCampo, tipoDado) =>
                    handleCampoChange(nomeCampo, tipoDado)
                  }
                />
              ))}
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

      <Dialog open={openConfirmar} onClose={closeModalConfirmar}>
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
              Excluir campo original
            </Typography>

            <Box flex={1} margin={2}>
              <Typography flex={1} variant="body1">
                Tem certeza de que deseja excluir este campo?
              </Typography>

              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                marginTop={3}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={excluirCampo}
                >
                  Excluir
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeModalConfirmar}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Box>

          <Box position={"absolute"} right={8} top={8}>
            <IconButton onClick={closeModalConfirmar}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
