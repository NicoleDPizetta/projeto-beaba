import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";

export const TabelaInfosArquivo: React.FC = () => {
  const theme = useTheme();

  const [dados, setDados] = useState({
    extensao: "",
    colunas: 0,
    linhas: 0,
  });

  useEffect(() => {
    // Simulando dados do backend, substituir depois
    setTimeout(() => {
      const dadosDoBackend = {
        extensao: ".csv",
        colunas: 10,
        linhas: 12,
      };
      setDados(dadosDoBackend);
    });
  }, []);

  return (
    <Paper elevation={1} style={{ width: "20rem", margin: "auto" }}>
      <Table size="medium">
        <TableBody>
          <TableRow>
            <TableCell sx={{color:'primary.main', fontSize: '1rem'}}>
              Tipo de arquivo:
            </TableCell>
            <TableCell>{dados.extensao}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{color:'primary.main', fontSize: '1rem'}}>Colunas:</TableCell>
            <TableCell>{dados.linhas}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{color:'primary.main', fontSize: '1rem'}}
            >
              Linhas:
            </TableCell>
            <TableCell>{dados.linhas}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
