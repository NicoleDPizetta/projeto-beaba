import React from "react";
import { MenuItem, TextField } from "@mui/material";

interface ISelectSquadsProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const squads = [
  {
    value: "Business TECH",
    label: "Business TECH",
  },
  {
    value: "Cartão",
    label: "Cartão",
  },
  {
    value: "Mercantil",
    label: "Mercantil",
  },
  {
    value: "Mobile",
    label: "Mobile",
  },
  {
    value: "DA",
    label: "DA",
  },
];

export const SelectSquads: React.FC<ISelectSquadsProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      required
      fullWidth
      select
      sx={{ width: 250 }}
      label="Squad"
      name="squad"
      type="text"
      placeholder="Informe sua squad"
      value={value}
      onChange={onChange}
    >
      {squads.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
