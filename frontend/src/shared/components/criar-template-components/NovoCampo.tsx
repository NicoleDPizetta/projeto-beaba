import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";

const tipos = [
  {
    value: "VARCHAR",
    label: "Texto",
  },
  {
    value: "INTEGER",
    label: "Número inteiro",
  },
  {
    value: "DECIMAL",
    label: "Número decimal / Moeda",
  },
  {
    value: "DATE",
    label: "Data apenas",
  },
  {
    value: "TIMESTAMP",
    label: "Data e Hora",
  },
];

export const NovoCampo: React.FC = () => {
  return (
    <Box
      flex={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingY={2}
      gap={26}
    >
      <Box flex={1}>
        <TextField
          fullWidth
          required
          id="nome-da-coluna"
          label="Nome da coluna"
          placeholder="Digite um nome para a coluna"
          variant="outlined"
        />
      </Box>

      <TextField
        select
        required
        sx={{ width: 250 }}
        id="tipo-de-dado"
        label="Tipo de dado"
        placeholder="Tipo de dado esperado"
      >
        {tipos.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
