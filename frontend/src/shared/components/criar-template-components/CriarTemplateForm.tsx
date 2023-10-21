import React, { useEffect, useState } from "react";
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
  status: false,
  criador: "",
};

export const CriarTemplateForm: React.FC = () => {
  const theme = useTheme();

  // Função para pegar dados do usuário logado
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

  // Estado para os campos do formulário
  const [formData, setFormData] = useState(initialState);
  const [nomeColuna, setNomeColuna] = useState("");
  const [tipoDado, setTipoDado] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const jsonObj = { [nomeColuna]: tipoDado };

  // Estados para selects do formulário
  const [qntCampos, setQntCampos] = useState<string>("");
  const [selectedSquad, setSelectedSquad] = useState<string>("");
  const [selectedExtensao, setselectedExtensao] = useState<string>("");

  // Funções para atualizar os estados dos selects do formulário
  const handleQuantidadeCamposChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQntCampos(event.target.value);
  };
  const handleSquadChange = (event: React.ChangeEvent<{ value: unknown }>) => {setSelectedSquad(event.target.value as string)};
  
  const handleExtensaoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setselectedExtensao(event.target.value as string);
  };

  // Função para atualizar o estado do checkbox
  const handleCheckboxChange = (newChecked: boolean) => {setIsChecked(newChecked)};

  // Função para atualizar o estado dos campos do template
  const handleNomeColunaChange = (campo: string) => {
    const valorNomeColuna = campo;
    setNomeColuna(valorNomeColuna);
  };

  // Função para atualizar o estado do select de Tipo de Dados
  const handleTipoDadoChange = (tipo: string) => {
    const valorTipoDado = tipo;
    setTipoDado(valorTipoDado);
  };

  // Função para atualizar o estado dos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para ENVIAR DADOS DO TEMPLATE
  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, colunas, linhas } = formData;

    const dataToSend = {
      nome,
      extensao: selectedExtensao,
      colunas,
      linhas,
      campos: jsonObj,
      status: isChecked,
      squad: selectedSquad,
      criador: usuarioLogado?.id || "",
    };

    console.log(dataToSend);

    /* try {
      const response = await api.post("/criar-template", dataToSend);

      if (response.status === 200) {
        console.log("Resposta do servidor:", response.data);
        window.location.href = "http://localhost:3000/templates";
      } else {
        console.log("Falha ao criar template");
      }
    } catch (error) {
      console.error("Erro ao enviar dados do template:", error);
    } */
  };

  // Renderização dos campos
  const camposRenderizados = Array.from(
    { length: parseInt(qntCampos) || 0 },
    (_, index) => (
      <NovoCampo
        key={index}
        onCampoChange={handleNomeColunaChange}
        onTipoChange={handleTipoDadoChange}
      />
    )
  );

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
            onChange={handleInputChange}
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
              name="linhas"
              onChange={handleInputChange}
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            gap={4}
          >
            <SelectExtensoes value={selectedExtensao} onChange={handleExtensaoChange} />
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

      <InfosLaterais isChecked={isChecked} onCheckboxChange={handleCheckboxChange} onButtonClick={handleButtonClick} />
    </Paper>
  );
};
