import React from "react";
import { MenuItem, TextField } from "@mui/material";

interface ISelectTiposDadosProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

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

export const SelectTiposDados: React.FC<ISelectTiposDadosProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      select
      required
      sx={{ width: 250 }}
      id="tipo-de-dado"
      label="Tipo de dado"
      placeholder="Tipo de dado esperado"
      name="tipo-dados"
      value={value}
      onChange={onChange}
    >
      {tipos.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
