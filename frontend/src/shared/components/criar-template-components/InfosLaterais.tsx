import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Checkbox, useTheme } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export const InfosLaterais: React.FC = ({}) => {
  const theme = useTheme();
  const [dataAtual, setDataAtual] = useState(new Date());
  const [isChecked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataAtual(new Date());
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      flex={1}
      minHeight={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={theme.palette.primary.main}
      color={theme.palette.primary.contrastText}
      borderRadius={"0 .2rem .2rem 0"}
      padding={"4rem 1rem"}
      gap={4}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <CalendarMonthOutlinedIcon
          fontSize="medium"
          color="info"
          sx={{ color: theme.palette.primary.contrastText }}
        />
        <Typography variant="body1" color={theme.palette.primary.contrastText}>
          {dataAtual.toLocaleDateString()}
        </Typography>
      </Box>

      <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" gap={3}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Checkbox
              onChange={handleChange}
              value={isChecked}
          />
          <Typography variant="body1" color={theme.palette.primary.contrastText}>
              Gerar template inativo
          </Typography>
        </Box>

        <Button id="btn-criar-template" variant="contained">Criar template</Button>
      </Box>
    </Box>
  );
};
