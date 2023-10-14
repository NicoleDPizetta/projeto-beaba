import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Switch,
  Button,
  useTheme,
} from "@mui/material";
import { api } from "../../../server/api/api";
import { ModalExcluirTemplate } from "./ModalExcluirTemplate";

interface IModalTemplateOptionsProps {
  id: string;
  nome: string;
  status: boolean;
}

export const ModalTemplateOptions: React.FC<IModalTemplateOptionsProps> = ({
  id,
  nome,
  status,
}) => {
  const theme = useTheme();

  const [statusSwitch, setStatusSwitch] = useState(status);

  const handleChange = () => {
    setStatusSwitch(!statusSwitch);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.put(`/templates/:id`, { id: id, status: statusSwitch });

      if (response.status === 200) {
        console.log("Status atualizado com sucesso");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <Box
      width={400}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={4}
    >
      <Typography
        width={"100%"}
        variant="h6"
        textAlign={"center"}
        fontWeight={700}
        color={theme.palette.primary.main}
        borderBottom={"2px solid"}
        borderColor={theme.palette.primary.main}
        padding={2}
      >
        {nome}
      </Typography>

      <Box
        width={"98%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
         <Typography variant="body1" fontWeight={500}>Status</Typography>
        <Grid container display={"flex"} alignItems="center" justifyContent={"center"} spacing={1}>
          <Grid item>
            <Typography variant="body1">Inativo</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={statusSwitch}
              onChange={handleChange}
              name="status-switch"
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">Ativo</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <ModalExcluirTemplate key={id} id={id} nome={nome}/>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
