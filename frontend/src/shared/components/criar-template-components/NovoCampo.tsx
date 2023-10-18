import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { SelectTiposDados } from "../selects-e-valores/SelectTiposDados";

export const NovoCampo: React.FC<{
  onCampoChange: (campo: any, index: number) => void;
  index: number;
}> = ({ onCampoChange, index }) => {
  const [campo, setCampo] = useState("");

  const handleCampoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampo(e.target.value);
    onCampoChange(campo, index);
  };

  /* Pegando valor do SelectTipoDados */
  const [selectedTipoDados, setSelectedTipoDados] = useState<string>("");

  const handleSelectedTipoDados = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedTipoDados(event.target.value as string);
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

      <SelectTiposDados value={selectedTipoDados} onChange={handleSelectedTipoDados} />
    </Box>
  );
};
