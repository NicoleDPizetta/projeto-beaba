import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Dialog,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

interface IModalProps {
  id: string;
  nome: string;
  campos: { [key: string]: string } | {};
}

export const ModalVisualizarCampos: React.FC<IModalProps> = ({
  id,
  nome,
  campos,
}) => {
  const theme = useTheme();
  const [open, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  if (!id || !campos) {
    return <div>Nenhum template encontrado ou campos vazios.</div>;
  }

  const typeMappings: { [key: string]: string } = {
    str: "Texto (str)",
    int: "Número inteiro (int)",
    float: "Número decimal / Moeda (float)",
    date: "Data apenas (date)",
    datetime: "Data e Hora (datetime)",
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        color="info"
        onClick={openModal}
        endIcon={<ContentPasteSearchIcon />}
      >
        Visualizar campos
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
              {nome}
            </Typography>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              padding={4}
            >
              <Paper>
                <Table aria-label="Template Table">
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Nome da coluna</TableCell>
                      <TableCell>Tipo esperado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(campos).map(([nomeColuna, tipoDado]) => (
                      <TableRow key={nomeColuna} hover>
                        <TableCell>{nomeColuna}</TableCell>
                        <TableCell>
                          {typeMappings[tipoDado] || tipoDado}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
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
