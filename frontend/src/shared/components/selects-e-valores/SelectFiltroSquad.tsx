import React from "react";
import { Box, Typography, TextField, MenuItem, useTheme } from "@mui/material";

interface SelectFiltroSquadProps {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  titleText: string;
}

const squads = [
  {
    value: "Todos",
    label: "Mostrar todos",
  },
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

export const SelectFiltroSquad: React.FC<SelectFiltroSquadProps> = ({
  value,
  onChange,
  titleText,
}) => {
  const theme = useTheme();

  return (
    <Box
      width={"98%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={2}
    >
      <Box
        width={"90%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" color={theme.palette.primary.main}>
          {titleText}
        </Typography>

        <TextField
          select
          sx={{ width: 200 }}
          size="small"
          label="Filtrar por squad"
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
      </Box>
    </Box>
  );
};
