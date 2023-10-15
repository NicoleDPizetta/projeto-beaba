import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  MenuItem,
  Button,
  Menu,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";

interface IMenuContaUsuarioProps {
  avatarSrc: string;
  avatarAlt: string;
  userName: string;
}

export const MenuContaUsuario: React.FC<IMenuContaUsuarioProps> = ({
  avatarSrc,
  avatarAlt,
  userName,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <Box>
      <Button
        variant="text"
        disableElevation
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Avatar
            sx={{
              height: theme.spacing(5),
              width: theme.spacing(5),
              color: "primary",
            }}
            src={avatarSrc}
            alt={avatarAlt}
          />
          <Typography variant="h6" textTransform="capitalize" color="primary">
            Olá, {userName}!
          </Typography>
        </Box>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ width: "11rem", lineHeight: "150%" }}
        >
          Meu Perfil
        </MenuItem>
        <MenuItem
          onClick={HandleLogout}
          sx={{ width: "11rem", lineHeight: "150%" }}
        >
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};
