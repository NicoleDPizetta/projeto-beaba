import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Paper } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { MenuContaUsuario } from "../menu-conta-usuario/MenuContaUsuario";
import { AuthUsuarioLogado } from "../../../middleware";

interface UsuarioLogadoInfos {
  id: string;
  nome_completo: string;
  nome_exibicao: string;
  matricula: string;
  permissao: string;
  squad: string;
  cargo: string;
  email: string;
}

export const Header = () => {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();
  const [searchValue, setSearchValue] = useState("");

  const getUsuarioLogado = async () => {
    const usuario = await AuthUsuarioLogado();
    if (usuario) {
      setUsuarioLogado(usuario);
    } else {
      console.error("AuthUsuarioLogado returned undefined.");
    }
  };

  useEffect(() => {
    getUsuarioLogado();
  }, []);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      const termoCodificado = encodeURIComponent(searchValue);
      navigate(`/resultados?busca=${termoCodificado}`);
    }
  };

  const nomeExibicao = usuarioLogado ? usuarioLogado.nome_exibicao : "Usuário!";
  const avatarAlt = usuarioLogado ? nomeExibicao : "Usuário";
  const avatarUsuario = usuarioLogado ? usuarioLogado.nome_completo : avatarAlt;

  return (
    <Box
      component={Paper}
      padding={2}
      paddingX={4}
      display="flex"
      alignItems="center"
      gap={16}
    >
      <Box flex={2} display="flex" justifyContent="center">
        <TextField
          size="small"
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Pesquisar template por nome"
          type="search"
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSearch}
        >
          <SearchOutlinedIcon />
        </Button>
      </Box>

      <Box flex={1} display="flex" justifyContent="end">
        <MenuContaUsuario
          avatarSrc={avatarUsuario}
          avatarAlt={avatarAlt}
          userName={nomeExibicao}
        />
      </Box>
    </Box>
  );
};
