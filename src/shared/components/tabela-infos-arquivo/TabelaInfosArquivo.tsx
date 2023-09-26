import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";

export const TabelaInfosArquivo: React.FC = () => {
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
    <Paper elevation={1} style={{ maxWidth: 300, margin: "auto" }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="cor-destaque">Tipo de arquivo:</TableCell>
            <TableCell>{dados.extensao}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="cor-destaque">Colunas:</TableCell>
            <TableCell>{dados.linhas}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="cor-destaque">Linhas:</TableCell>
            <TableCell>{dados.linhas}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
