import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";

export const LateralDoCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      bgcolor={theme.palette.primary.main}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="space-between"
      padding="2rem"
      borderRadius="0 0 .3rem 0"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={3}
        marginBottom={4}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              width: "1.5rem",
              height: "1.5rem",
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

        <Box display="flex" alignItems="center" gap={1}>
          <CalendarMonthOutlinedIcon
            fontSize="medium"
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

        <Box display="flex" alignItems="center" gap={1}>
          <Grid3x3OutlinedIcon
            fontSize="medium"
            color="info"
            sx={{ color: (Theme) => Theme.palette.primary.contrastText }}
          />
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            ID do Template
          </Typography>
        </Box>
      </Box>

      <Button
        fullWidth
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
