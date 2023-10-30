import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";

export const AbasDaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meusTemplatesAtivo, setMeusTemplatesAtivo] = useState(location.pathname === "/home");
  const [meusUploadsAtivo, setMeusUploadsAtivo] = useState(location.pathname === "/uploads");

  const handleMeusTemplatesClick = () => {
    navigate("/home");
    setMeusTemplatesAtivo(true);
    setMeusUploadsAtivo(false);
  };

  const handleMeusUploadsClick = () => {
    navigate("/uploads");
    setMeusUploadsAtivo(true);
    setMeusTemplatesAtivo(false);
  };

  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={4} >
      <Button
        variant={meusTemplatesAtivo ? "contained" : "outlined"}
        onClick={handleMeusTemplatesClick}
      >
        Meus templates salvos
      </Button>
      <Button
        variant={meusUploadsAtivo ? "contained" : "outlined"}
        onClick={handleMeusUploadsClick}
      >
        Meus uploads
      </Button>
    </Box>
  );
};
