import React, { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { MenuLateral } from "../components/menu-lateral/MenuLateral";
import { Header } from "../components";

export const LayoutBase: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      minHeight={"100vh"}
      width={"100%"}
      bgcolor={theme.palette.background.default}
    >
      <MenuLateral />

      <Box display="flex" marginLeft={theme.spacing(31)} flexDirection={"column"} gap={8}>
        <Header />

        <Box overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
