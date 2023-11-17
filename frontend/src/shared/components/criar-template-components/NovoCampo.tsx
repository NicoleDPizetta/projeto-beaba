import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { SelectTiposDados } from "../selects-e-valores/SelectTiposDados";

export const NovoCampo: React.FC<{
  onCampoChange: (campo: string, tipoDado: string) => void;
}> = ({ onCampoChange }) => {
  const [campo, setCampo] = useState("");
  const [tipoDado, setTipoDado] = useState("");

  const handleCampoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const campoValue = e.target.value;
    setCampo(campoValue);
  };

  const handleSelectedTipoDados = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedTipoDados = event.target.value as string;
    setTipoDado(selectedTipoDados);
    onCampoChange(campo, selectedTipoDados);
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingY={2}
      gap={4}
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
