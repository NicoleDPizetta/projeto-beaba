import { Box, Typography, Paper, useTheme } from "@mui/material";

interface IVantagensProps {
  texto: string;
  svg: string;
}

export const Vantagens: React.FC<IVantagensProps> = ({ texto, svg }) => {
  const theme = useTheme();

  return (
    <Paper
      component={Box}
      height={"10rem"}
      width={"24rem"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      padding={2}
      bgcolor={theme.palette.background.paper}
      borderRadius={".3rem"}
    >
      <Box flex={1} textAlign={"center"}>
        <Typography>{texto}</Typography>
      </Box>

      <Box flex={1}>
        <img
          width={"100%"}
          height={"100%"}
          src={svg}
          alt={texto}
          loading={"lazy"}
        />
      </Box>
    </Paper>
  );
};
