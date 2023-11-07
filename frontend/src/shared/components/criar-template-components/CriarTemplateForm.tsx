import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, useTheme, Paper } from "@mui/material";
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
  colunas: 0,
  linhas: 0,
  campos: {},
  squad: "",
  status: true,
  criador: "",
};

export const CriarTemplateForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Função para pegar os dados do usuário logado
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

  useEffect(() => {
    const getUsuarioLogado = async () => {
      const usuario = await AuthUsuarioLogado();
      if (usuario) {
        setUsuarioLogado(usuario);
      } else {
        console.error("AuthUsuarioLogado returned undefined.");
        window.location.href = "http://localhost:3000/login";
      }
    };
    getUsuarioLogado();
  }, []);

  // Estados para os campos do formulário
  const [formData, setFormData] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false);

  // Estados para selects do formulário
  const [qntCampos, setQntCampos] = useState<number>(0);
  const [qntLinhas, setQntLinhas] = useState<number>(0);
  const [camposInfo, setCamposInfo] = useState<{ [key: string]: string }>({});
  const [selectedSquad, setSelectedSquad] = useState<string>("");
  const [selectedExtensao, setselectedExtensao] = useState<string>("");

  // Funções para atualizar o estado dos inputs do formulário
  const handleQuantidadeCamposChange = (event: React.ChangeEvent<HTMLInputElement>) => {setQntCampos(parseInt(event.target.value, 10))};
  const handleLinhasChange = (event: React.ChangeEvent<HTMLInputElement>) => {setQntLinhas(parseInt(event.target.value, 10))};

  const handleCampoChange = (campo: string, tipoDado: string) => {
    setCamposInfo((prevCamposInfo) => ({...prevCamposInfo, [campo]: tipoDado,}));
  };
  
  const handleNomeTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funções para atualizar o estado dos selects do formulário
  const handleExtensaoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setselectedExtensao(event.target.value as string);
  };

  const handleSquadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSquad(event.target.value as string);
  };

  // Função para atualizar o estado do checkbox
  const handleCheckboxChange = (newChecked: boolean) => {
    setIsChecked(newChecked);
  };

  // Função para ENVIAR DADOS DO TEMPLATE
  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome } = formData;

    const status = !isChecked

    const dataToSend = {
      nome,
      extensao: selectedExtensao,
      colunas: qntCampos,
      linhas: qntLinhas,
      campos: camposInfo,
      status,
      squad: selectedSquad,
      criador: usuarioLogado?.id || "",
    };

    console.log(dataToSend);

    try {
      const response = await api.post("/criar-template", dataToSend);

      if (response.status === 200) {
        console.log("Resposta do servidor:", response.data);
        navigate("/templates");
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
            id="template-name"
            placeholder="Digite um nome para o template"
            className="input-base"
            label="Nome do template"
            name="nome"
            onChange={handleNomeTemplateChange}
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
              type="number"
              label="Quantidade de colunas"
              placeholder="Digite apenas números"
              name="colunas"
              value={qntCampos}
              onChange={handleQuantidadeCamposChange}
              inputProps={{ min: 0 }}
            />

            <TextField
              required
              fullWidth
              label="Limite de linhas"
              type="number"
              placeholder="Zero (0) para não limitar"
              helperText={"Zero (0) para não limitar"}
              name="linhas"
              onChange={handleLinhasChange}
              inputProps={{ min: 0 }}
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

          {Array.from({ length: qntCampos }).map((campo, index) => (
            <NovoCampo
              key={index}
              onCampoChange={(nomeCampo, tipoDado) =>
                handleCampoChange(nomeCampo, tipoDado)
              }
            />
          ))}
        </Box>
      </Box>

      <InfosLaterais
        isChecked={isChecked}
        onCheckboxChange={handleCheckboxChange}
        onButtonClick={handleButtonClick}
      />
    </Paper>
  );
};
