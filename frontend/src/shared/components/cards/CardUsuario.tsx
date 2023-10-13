import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import { MoreOptionsButton } from "../modals/MoreOptionsButton";

interface ICardUsuarioProps {
  userName: string;
  userNickName: string;
  avatarSrc: string;
  userSquad: string;
  userCargo: string;
  userMatricula: string;
  userID: string;
  userPermissao: string;
}

export const CardUsuario: React.FC<ICardUsuarioProps> = ({
  userName,
  userNickName,
  avatarSrc,
  userSquad,
  userCargo,
  userMatricula,
  userID,
  userPermissao,
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={1} sx={{ width: "22rem" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        borderColor="primary.main"
      >
        <Box display={"flex"} gap={1} alignItems={"center"}>
          <Avatar
            sx={{
              height: theme.spacing(5),
              width: theme.spacing(5),
              color: "primary",
            }}
            src={avatarSrc}
            alt={userName}
          />
          <Typography variant="h6" color={theme.palette.primary.main}>
            {userName}
          </Typography>
        </Box>

        <MoreOptionsButton children={<h4>{userID}</h4>}/>
      </Box>

      <Box
        display={"flex"}
        alignItems={"space-between"}
        justifyContent={"space-between"}
        padding={2}
      >
        <Box
        flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Typography variant="body1">{userCargo}</Typography>

          <Typography variant="body1">{userSquad}</Typography>
        </Box>

        <Box
        flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          gap={1}
        >
          <Typography variant="body1">{userMatricula}</Typography>

          <Typography variant="body1">{userNickName}</Typography>
        </Box>
      </Box>

      <Box display={"flex"} padding={2} gap={1}>
        <Typography variant="body1" color={theme.palette.primary.main}>
          Tipo de permissão:
        </Typography>

        <Typography variant="body1">{userPermissao}</Typography>
      </Box>
    </Paper>
  );
};
