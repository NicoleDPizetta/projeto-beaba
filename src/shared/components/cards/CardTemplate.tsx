import * as React from "react";
import { useTheme, Box, Button, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export const CardTemplate: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ maxWidth: "43rem" }}
      display="flex"
      justifyContent="space-between"
      bgcolor={theme.palette.background.paper}
      borderRadius="1rem"
    >

      <Box
        flex={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" color="primary">
          Template Nome
        </Typography>
        <IconButton aria-label="settings" id="settings">
          <MoreHorizIcon />
        </IconButton>
      </Box>

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
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar-user">
            R
          </Avatar>
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            Nome do usuário
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <CalendarMonthOutlinedIcon fontSize="medium" color="info" />
          <Typography
            variant="body1"
            color={theme.palette.primary.contrastText}
          >
            Data de criação
          </Typography>
        </Box>
        <Button
          aria-label="add to favorites"
          variant="contained"
          color="primary"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
