import { ReactNode } from "react";
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

interface IListItemLinkProps {
  to: string;
  text: string;
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

  return (
    <Drawer variant="permanent" role="aside">
      <Box
        width={theme.spacing(32)}
        height="100%"
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: (Theme) => Theme.palette.primary.main }}
      >
        <LogoBox/>

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

            <ListItemLink to="/criar-template" text="Criar template" />

            <ListItemLink
              to="/gerenciar-templates"
              text="Gerenciar templates"
            />

            <ListItemLink to="/gerenciar-usuarios" text="Gerenciar usuários" />

            <ListItemLink to="/relatorios" text="Relatórios" />
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
