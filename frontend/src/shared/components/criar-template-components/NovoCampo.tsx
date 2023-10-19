import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { SelectTiposDados } from "../selects-e-valores/SelectTiposDados";

export const NovoCampo: React.FC<{
  onCampoChange: (campo: string) => void;
}> = ({ onCampoChange }) => {
  let campo = "";

  const handleCampoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    campo = e.target.value;
    console.log(campo);
    onCampoChange(campo);
  };

  /* Pegando valor do SelectTipoDados */
  const [selectedTipoDados, setSelectedTipoDados] = useState<string>("");

  /* let selectTipoDados = ""; */

  const handleSelectedTipoDados = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedTipoDados(event.target.value as string);
    /* selectTipoDados = event.target.value as string; */
    console.log(selectedTipoDados);
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
          name="nome"
          onChange={handleCampoChange}
        />
      </Box>

      <SelectTiposDados
        value={selectedTipoDados}
        onChange={handleSelectedTipoDados}
      />
    </Box>
  );
};
