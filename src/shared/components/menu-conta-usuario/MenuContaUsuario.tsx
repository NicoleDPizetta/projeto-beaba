import React from "react";
import {
  Box,
  MenuItem,
  Button,
  Menu,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";

export const MenuContaUsuario: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Box display='flex' alignItems='center' justifyContent='center' gap={1}>
          <Avatar
            sx={{ height: theme.spacing(6), width: theme.spacing(6) }}
            src="https://avatars.githubusercontent.com/u/90155139?v=4"
            alt="Foto do usuário"
          />
          <Typography variant="h6" textTransform="capitalize" color="primary">
            Olá, usuario!
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
        <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};
