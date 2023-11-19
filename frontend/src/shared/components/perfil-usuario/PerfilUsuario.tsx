import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
  Avatar,
  Paper,
} from "@mui/material";
import { ModalEditarMeuPerfil } from "../modals/ModalEditarMeuPerfil";
import { ModalEditarMinhaSenha } from "../modals/ModalEditarMinhaSenha";

interface IPerfilUsuarioProps {
  id: string;
  nome_completo: string;
  nome_exibicao: string;
  matricula: string;
  email: string;
  cargo: string;
  squad: string;
  avatarSrc: string;
  avatarAlt: string;
  permissao: string;
}

export const PerfilUsuario: React.FC<IPerfilUsuarioProps> = ({
  id,
  nome_completo,
  nome_exibicao,
  matricula,
  email,
  cargo,
  squad,
  avatarSrc,
  avatarAlt,
  permissao,
}) => {
  const theme = useTheme();

  const tableCellStyle = {
    fontSize: "1.2rem",
  };

  const coloredTableCellStyle = {
    ...tableCellStyle,
    color: theme.palette.primary.main,
  };

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
          borderBottom={"2px solid"}
          paddingBottom={2}
          borderColor={theme.palette.primary.main}
        >
          <Paper
            elevation={1}
            style={{ width: "40%", margin: "2rem auto 3rem" }}
          >
            <Table size="medium">
              <TableBody>
                <TableRow hover>
                  <TableCell sx={coloredTableCellStyle}>
                    Nome de exibição:
                  </TableCell>
                  <TableCell sx={tableCellStyle}>{nome_exibicao}</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell sx={coloredTableCellStyle}>Matrícula:</TableCell>
                  <TableCell sx={tableCellStyle}>{matricula}</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell sx={coloredTableCellStyle}>Squad:</TableCell>
                  <TableCell sx={tableCellStyle}>{squad}</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell sx={coloredTableCellStyle}>Cargo: </TableCell>
                  <TableCell sx={tableCellStyle}>{cargo}</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell sx={coloredTableCellStyle}>Permissao: </TableCell>
                  <TableCell sx={tableCellStyle}>{permissao}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>

        <Box
          width={"96%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={6}
          padding={1}
          marginBottom={4}
        >
          <ModalEditarMinhaSenha key={id+ "editar_senha"} id={id} />
          <ModalEditarMeuPerfil
            key={id + "editar_perfil"}
            id={id}
            nome_completo={nome_completo}
            nome_exibicao={nome_exibicao}
            matricula={matricula}
            cargo={cargo}
            email={email}
            squad={squad}
          />
        </Box>
      </Box>

      <Box
        flex={1}
        minHeight={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
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
              height: "12rem",
              width: "12rem",
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
          <Button disabled size="small" variant="outlined" color="inherit">
            Mudar foto
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
