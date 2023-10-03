import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  useTheme,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import { NovoCampo } from "./NovoCampo";
import { InfosLaterais } from "./InfosLaterais";

export const CriarTemplateForm: React.FC = () => {
  const theme = useTheme();
  const [extension, setExtension] = useState<string>("");
  const [qntCampos, setQntCampos] = useState<string>("");

  const handleExtensionChoice = (event: SelectChangeEvent) => {
    setExtension(event.target.value as string);
  };

  const handleInputCamposChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQntCampos(event.target.value);
  };

  const camposRenderizados = Array.from(
    { length: parseInt(qntCampos) || 0 },
    (_, index) => <NovoCampo key={index} />
  );

  return (
    <Paper
      elevation={3}
      component={Box}
      width={"95%"}
      marginX={"auto"}
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      border={"1px solid red"}
      gap={2}
    >
      <Box
        flex={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={4}
        padding={2}
      >
        <Box
          width={"100%"}
          borderBottom={"2px solid"}
          paddingBottom={2}
          borderColor={theme.palette.primary.main}
        >
          <TextField
            required
            fullWidth
            type="text"
            name="template-name"
            id="template-name"
            placeholder="Digite um nome para o template"
            className="input-base"
            label="Nome do template"
          />
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box width={"50%"} display={"flex"} flexDirection={"column"} gap={4}>
            <TextField
              required
              fullWidth
              type="text"
              name="template-squad"
              id="template-squad"
              placeholder="Informe a squad a qual o template pertencerá"
              className="input-base"
              label="Squad"
            />

            <TextField
              required
              fullWidth
              id="quantidade-colunas"
              type="number"
              label="Quantidade de colunas"
              placeholder="Digite apenas números"
              value={qntCampos}
              onChange={handleInputCamposChange}
            />

            <TextField
              fullWidth
              id="quantidade-linhas"
              label="Quantidade de linhas"
              type="number"
              placeholder="Zero (0) para não limitar"
            />
          </Box>

          <Select
            required
            sx={{ width: 200 }}
            id="select-extensao"
            label="Formato do arquivo"
            placeholder="Extensão do arquivo"
            value={extension}
            onChange={handleExtensionChoice}
          >
            <MenuItem value={".csv"}>.csv</MenuItem>
            <MenuItem value={".xlsx"}>.xlsx</MenuItem>
            <MenuItem value={".xlx"}>.xlx</MenuItem>
          </Select>
        </Box>

        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          <Typography
            textAlign="left"
            width={"100%"}
            color={theme.palette.primary.main}
            fontSize={"1.25rem"}
            borderBottom={"2px solid"}
            borderColor={theme.palette.primary.main}
          >
            Campos do template
          </Typography>

          {camposRenderizados}
        </Box>
      </Box>

      <InfosLaterais/>
    </Paper>
  );
};
