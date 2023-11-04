import React from "react";
import { MenuItem, TextField } from "@mui/material";

interface ISelectExtensoesProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const extensions = [
  {
    value: ".xlsx",
    label: ".xlsx",
  },
  {
    value: ".xls",
    label: ".xls",
  },
  {
    value: ".csv",
    label: ".csv",
  },
];

export const SelectExtensoes: React.FC<ISelectExtensoesProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      required
      fullWidth
      select
      sx={{ width: 250 }}
      id="select-extensao"
      label="Formato do arquivo"
      placeholder="Extensão do arquivo"
      value={value}
      onChange={onChange}
    >
      {extensions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
