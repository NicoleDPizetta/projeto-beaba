import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";

interface TemplateInfos {
  extensao: string;
  colunas: number;
  linhas: number | null;
}

export const TabelaInfosArquivo: React.FC<TemplateInfos> = ({
  extensao,
  colunas,
  linhas,
}) => {
  useState<TemplateInfos[]>([]);
  const linhasExibicao = linhas === null ? "Ilimitadas" : linhas;

  return (
    <Paper elevation={0} style={{ width: "20rem", margin: "auto" }}>
      <Table size="medium">
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontSize: "1rem" }}>Tipo de arquivo:</TableCell>
            <TableCell>{extensao}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "1rem" }}>Colunas:</TableCell>
            <TableCell>{colunas}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "1rem" }}>Linhas:</TableCell>
            <TableCell>{linhasExibicao}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
