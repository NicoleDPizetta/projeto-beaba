import React from "react";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Avatar,
  Paper,
  Button,
} from "@mui/material";

interface IPerfilUsuarioProps {
  nome_completo: string;
  nome_exibicao: string;
  matricula: string;
  email: string;
  cargo: string;
  squad: string;
  avatarSrc: string;
  avatarAlt: string;
}

export const PerfilUsuario: React.FC<IPerfilUsuarioProps> = ({
  nome_completo,
  nome_exibicao,
  matricula,
  cargo,
  squad,
  avatarSrc,
  avatarAlt,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      component={Box}
      width={"95%"}
      marginX={"auto"}
      display={"flex"}
      gap={2}
    >
      <Box
        flex={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={4}
        padding={2}
      >
        <Box
          width={"100%"}
          borderBottom={"2px solid"}
          paddingBottom={2}
          borderColor={theme.palette.primary.main}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            color={theme.palette.primary.main}
          >
            {nome_completo}
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          gap={12}
        >
          <Box
            width={"50%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={4}
          >
            <TextField
              fullWidth
              type="text"
              name="nome_completo"
              placeholder="Seu nome completo"
              label="Nome completo"
              variant="standard"
              value={nome_completo}
            />

            <TextField
              fullWidth
              type="text"
              name="nome_exibicao"
              placeholder="Nome de exibição na plataforma"
              label="Nome de exibição"
              variant="standard"
              value={nome_exibicao}
            />

            <TextField
              fullWidth
              disabled
              type="text"
              name="-matricula"
              placeholder="Matricula"
              label="Matricula"
              variant="standard"
              value={matricula}
            />
          </Box>

          <Box
            width={"50%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={4}
          >
            <TextField
              fullWidth
              type="text"
              name="squad"
              placeholder="Informe a squad a qual o usuario pertencerá"
              className="input-base"
              label="Squad"
              variant="standard"
              value={squad}
            />

            <TextField
              fullWidth
              type="text"
              name="cargo"
              placeholder="Seu cargo"
              className="input-base"
              label="Cargo"
              variant="standard"
              value={cargo}
            />
          </Box>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          marginTop={2}
        >
          <Typography
            textAlign="left"
            width={"100%"}
            color={theme.palette.primary.main}
            fontSize={"1.25rem"}
            borderBottom={"2px solid"}
            borderColor={theme.palette.primary.main}
          >
            Mudar email:
          </Typography>

          <Box
            width={"100%"}
            display={"flex"}
            paddingY={3}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={12}
          >
            <Box flex={1}>
              <TextField
                fullWidth
                name="email"
                id="novo-email"
                label="Digite seu novo email"
                type="email"
                placeholder="Digite seu novo email"
              />
            </Box>

            <Box flex={1}>
              <TextField
                fullWidth
                id="novo-email-confirmar"
                label="Confirme seu novo email"
                type="email"
                placeholder="Confirme seu novo email"
              />
            </Box>
          </Box>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={2}
        >
          <Typography
            textAlign="left"
            width={"100%"}
            color={theme.palette.primary.main}
            fontSize={"1.25rem"}
            borderBottom={"2px solid"}
            borderColor={theme.palette.primary.main}
          >
            Mudar senha:
          </Typography>

          <Box
            width={"100%"}
            display={"flex"}
            paddingY={3}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={12}
          >
            <Box flex={1}>
              <TextField
                fullWidth
                name="senha"
                id="nova-senha"
                label="Digite sua nova senha"
                type="password"
                placeholder="Digite sua nova senha"
              />
            </Box>

            <Box flex={1}>
              <TextField
                fullWidth
                id="nova-senha-confirmar"
                label="Confirme sua nova senha"
                type="password"
                placeholder="Confirme sua nova senha"
              />
            </Box>
          </Box>
        </Box>
      </Box>

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
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          padding={0.5}
          border={"2px solid"}
          borderColor={theme.palette.primary.contrastText}
          borderRadius={"50%"}
        >
          <Avatar
            sx={{
              height: "14rem",
              width: "14rem",
              color: "primary",
            }}
            src={avatarSrc}
            alt={avatarAlt}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          color={theme.palette.primary.contrastText}
        >
          <Typography variant="body1">{nome_exibicao}</Typography>
          <Typography variant="body1"> {matricula}</Typography>
          <Typography variant="body1">{squad}</Typography>
          <Typography variant="body1">{cargo}</Typography>
        </Box>

        <Button id="btn-salvar-perfil" variant="contained">
          Salvar
        </Button>
      </Box>
    </Paper>
  );
};
