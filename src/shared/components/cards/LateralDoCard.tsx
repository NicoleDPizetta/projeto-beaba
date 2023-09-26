import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export const LateralDoCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      bgcolor={theme.palette.primary.main}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      padding={4}
      borderRadius="0 1rem 1rem 0"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={3}
        marginBottom={4}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              width: "2.2rem",
              height: "2.2rem",
              backgroundColor: (Theme) => Theme.palette.primary.contrastText,
              color: (Theme) => Theme.palette.primary.main,
            }}
            aria-label="avatar-user"
            alt="Remy Sharp"
            src="/broken-image.jpg"
          />
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            Nome do usuário
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <CalendarMonthOutlinedIcon
            fontSize="large"
            color="info"
            sx={{ color: (Theme) => Theme.palette.primary.contrastText }}
          />
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            Data de criação
          </Typography>
        </Box>
      </Box>

      <Button
        aria-label="add to favorites"
        variant="contained"
        color="primary"
        id="btn-salvar-template"
      >
        Salvar
      </Button>
    </Box>
  );
};
