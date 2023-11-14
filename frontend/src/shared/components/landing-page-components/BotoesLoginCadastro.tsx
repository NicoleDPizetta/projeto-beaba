import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const BotoesLoginCadastro = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        Entrar
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/cadastrar");
        }}
      >
        Cadastrar
      </Button>
    </>
  );
};
