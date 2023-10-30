import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";

export const AbasLoginCadastro = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState(location.pathname === "/login");
  const [cadastrar, setCadastrar] = useState(location.pathname === "/cadastrar");

  const bordaVerde = theme.palette.primary.main;
  const bordaCinza = theme.palette.info.light;

  const handleLogin = () => {
    navigate("/login");
    setLogin(true);
    setCadastrar(false);
  };

  const handleCadastrar = () => {
    navigate("/cadastrar");
    setCadastrar(true);
    setLogin(false);
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      fontSize={"1.2rem"}
      textAlign={"center"}
    >
      <Box
        flex={1}
        borderBottom={"3px solid"}
        borderColor={login ? bordaVerde : bordaCinza}
      >
        <Button fullWidth variant="text" onClick={handleLogin}>
          Login
        </Button>
      </Box>

      <Box
        flex={1}
        borderBottom={"3px solid"}
        borderColor={cadastrar ? bordaVerde : bordaCinza}
      >
        <Button fullWidth variant="text" onClick={handleCadastrar}>
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};
