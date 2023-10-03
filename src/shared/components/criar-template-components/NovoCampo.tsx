import React from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

export const NovoCampo: React.FC = () => {
  const [tipo, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

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

      <Select
        required
        sx={{ width: 200 }}
        id="tipo-de-dado"
        value={tipo}
        label="Tipo de dado"
        placeholder="Tipo de dado esperado"
        onChange={handleChange}
      >
        <MenuItem value={"VARCHAR"}>Texto</MenuItem>
        <MenuItem value={"INTEGER"}>Número inteiro</MenuItem>
        <MenuItem value={"DECIMAL"}>Número decimal</MenuItem>
        <MenuItem value={"DATE"}>Data apenas</MenuItem>
        <MenuItem value={"TIMESTAMP"}>Data e Hora</MenuItem>
      </Select>
    </Box>
  );
};
