import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import { pyApi } from "../../../server/api/api";

interface ICardUploadProps {
  id: string;
  id_gdrive: string;
  nome: string;
  extensao: string;
  colunas: number;
  linhas: number | null;
  campos: JSON;
  squad: string;
  data_upload: string;
  template_origem: string;
}

export const CardUpload: React.FC<ICardUploadProps> = ({
  id_gdrive,
  nome,
  data_upload,
  extensao,
  colunas,
  linhas,
  squad,
  template_origem,
}) => {
  const theme = useTheme();

  const handleBaixar = async () => {
    try {
      const response = await pyApi.get(`/download/${id_gdrive}/${nome}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nome;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Erro ao baixar arquivo: ${nome}`, error);
    }
  };

  const linhasExibicao = linhas === 0 ? "Ilimitadas" : linhas;

  return (
    <Paper elevation={1} sx={{ width: "28rem" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        borderBottom={`3px solid`}
        borderColor={theme.palette.primary.light}
        bgcolor={theme.palette.info.main}
        borderRadius={".3rem .3rem 0 0"}
      >
        <Typography
          flex={1}
          variant={"h6"}
          color={theme.palette.info.contrastText}
        >
          {nome}
        </Typography>

        <Button
          variant="contained"
          id="btn-salvar-template"
          onClick={handleBaixar}
        >
          Baixar
        </Button>
      </Box>

      <Box padding={2} display={"flex"} flexDirection={"column"}>
        <Paper
          elevation={0}
          style={{ width: "90%", margin: "auto", borderRadius: "2" }}
        >
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Tipo de arquivo:</TableCell>
                <TableCell>{extensao}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Colunas:</TableCell>
                <TableCell>{colunas}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Limite de linhas:</TableCell>
                <TableCell>{linhasExibicao}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Squad:</TableCell>
                <TableCell>{squad}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Template usado: </TableCell>
                <TableCell>{template_origem}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data de upload:</TableCell>
                <TableCell>{new Date(data_upload).toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Paper>
  );
};
