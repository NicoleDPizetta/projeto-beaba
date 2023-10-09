import { Box, useTheme } from "@mui/material";

export const LogoBox = () => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(20)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img
        width="90%"
        src="/logo.svg"
        alt="Logotipo das Lojas Quero Quero"
        loading="lazy"
      />
    </Box>
  );
};
