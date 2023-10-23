import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { LogoBox } from "../logo-box/LogoBox";
import { AuthUsuarioLogado } from "../../../middleware";

interface IListItemLinkProps {
  to: string;
  text: string;
}

interface UsuarioLogadoInfos {
  id: string;
  permissao: string;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, text }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
  };

  return (
    <ListItemButton
      selected={!!match}
      onClick={handleClick}
      sx={{ width: "100%", height: "5rem" }}
    >
      <ListItemText
        primary={text}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "500",
          letterSpacing: "0.125rem",
          textTransform: "uppercase",
          color: (Theme) => Theme.palette.info.contrastText,
        }}
      />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC = () => {
  const theme = useTheme();

  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

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

  const permissaoAtual = usuarioLogado?.permissao;

  return (
    <Drawer variant="permanent" role="aside">
      <Box
        width={theme.spacing(32)}
        height="100%"
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: (Theme) => Theme.palette.primary.main }}
      >
        <LogoBox />

        <Box
          width="100%"
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <List component="nav" sx={{ width: "100%" }}>
            <ListItemLink to="/home" text="Página inicial" />

            <ListItemLink to="/templates" text="Templates disponíveis" />

            {permissaoAtual === "CRIADOR" || permissaoAtual === "ADMINISTRADOR" ? (
              <ListItemLink to="/criar-template" text="Criar template" /> ) : null}

            {permissaoAtual === "CRIADOR" || permissaoAtual === "ADMINISTRADOR" ? (
              <ListItemLink to="/gerenciar-templates" text="Gerenciar templates" /> ) : null}

            {permissaoAtual === "ADMINISTRADOR" ? (
              <ListItemLink to="/usuarios" text="Gerenciar usuários" /> ) : null}

            {permissaoAtual === "ADMINISTRADOR" ? (
              <ListItemLink to="/relatorios" text="Relatórios" /> ) : null}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
