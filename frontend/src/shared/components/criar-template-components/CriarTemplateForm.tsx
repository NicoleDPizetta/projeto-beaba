import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Paper,
} from "@mui/material";
import { NovoCampo } from "./NovoCampo";
import { InfosLaterais } from "./InfosLaterais";
import { api } from "../../../server/api/api";
import { AuthUsuarioLogado } from "../../../middleware";
import { SelectSquads } from "../selects-e-valores/SelectSquads";
import { SelectExtensoes } from "../selects-e-valores/SelectExtensoes";

interface UsuarioLogadoInfos {
  id: string;
  nome_completo: string;
  permissao: string;
  squad: string;
}

const initialState = {
  nome: "",
  extensao: "",
  colunas: "",
  linhas: "",
  campos: [],
  status: true,
  squad: "",
};

export const CriarTemplateForm: React.FC = () => {
  const theme = useTheme();

  /* Pegando valor do SelectExtensao */
  const [selectedExtensao, setselectedExtensao] = useState<string>("");

  const handleExtensaoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setselectedExtensao(event.target.value as string);
  };

  /* Pegando valor do select Squad */
  const [selectedSquad, setSelectedSquad] = useState<string>("");

  const handleSquadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSquad(event.target.value as string);
  };

  /* Pegar Usuário Logado */
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

  useEffect(() => {
    const getUsuarioLogado = async () => {
      const usuario = await AuthUsuarioLogado();
      if (usuario) {
        setUsuarioLogado(usuario);
      } else {
        console.error("AuthUsuarioLogado returned undefined.");
      }
    };
    getUsuarioLogado();
  }, []);

  /* Alterando quantidade de campos renderizados */
  const [qntCampos, setQntCampos] = useState<string>("");

  const handleQuantidadeCamposChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQntCampos(event.target.value);
  };

  /* Interagindo com o componente NovoCampo */
  const [campos, setCampos] = useState<string[]>([]);

  const handleCampoChange = (campo: string, index: number) => {
    const newCampos = [...campos];
    newCampos[index] = campo;
    setCampos(newCampos);
  };

  const camposRenderizados = Array.from(
    { length: parseInt(qntCampos) || 0 },
    (_, index) => (
      <NovoCampo key={index} onCampoChange={handleCampoChange} index={index} />
    )
  );

  /* Criar Template */
  const [formData, setFormData] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const criador = usuarioLogado?.nome_completo;
      const templateData = { ...formData, campos, criador: criador };

      const response = await api.post("/templates", templateData);
      const data = response.data;
      console.log(data);

      if (data.token) {
        window.location.href = "http://localhost:3000/templates";
      } else {
        console.log("Falha ao criar template");
      }
    } catch (error) {
      console.error("Erro ao enviar dados do template:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      component={Box}
      width={"95%"}
      margin={"auto"}
      display={"flex"}
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
          gap={12}
        >
          <Box width={"50%"} display={"flex"} flexDirection={"column"} gap={4}>
            <TextField
              required
              fullWidth
              id="quantidade-colunas"
              type="number"
              label="Quantidade de colunas"
              placeholder="Digite apenas números"
              value={qntCampos}
              onChange={handleQuantidadeCamposChange}
            />

            <TextField
              fullWidth
              id="quantidade-linhas"
              label="Quantidade de linhas"
              type="number"
              placeholder="Zero (0) para não limitar"
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            gap={4}
          >
            <SelectExtensoes
              value={selectedExtensao}
              onChange={handleExtensaoChange}
            />
            <SelectSquads value={selectedSquad} onChange={handleSquadChange} />
          </Box>
        </Box>

        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          <Typography
            textAlign="left"
            width={"100%"}
            color={theme.palette.primary.main}
            fontSize={"1.25rem"}
            borderBottom={"2px solid"}
            borderColor={theme.palette.primary.main}
            marginBottom={2}
          >
            Campos do template
          </Typography>

          {camposRenderizados}
        </Box>
      </Box>

      <InfosLaterais />
    </Paper>
  );
};
