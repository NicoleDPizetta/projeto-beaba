import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { SelectTiposDados } from "../selects-e-valores/SelectTiposDados";

export const NovoCampo: React.FC<{
  onCampoChange: (campo: string) => void;
  onTipoChange: (tipo: string) => void;
}> = ({ onCampoChange }) => {
  let campo = "";

  const handleCampoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    campo = e.target.value;
    onCampoChange(campo);
  };

  /* Pegando valor do SelectTipoDados */
  const [tipoDado, setTipoDado] = useState<string>("");

  const handleSelectedTipoDados = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedTipoDados = event.target.value as string;
    console.log(selectedTipoDados);
    setTipoDado(selectedTipoDados);
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

      <SelectTiposDados value={tipoDado} onChange={handleSelectedTipoDados} />
    </Box>
  );
};
