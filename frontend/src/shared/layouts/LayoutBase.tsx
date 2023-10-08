import React, { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { MenuLateral } from "../components/menu-lateral/MenuLateral";
import { Header } from "../components";

interface ILayoutBaseProps {
  header: ReactNode;
  aside: ReactNode;
}

export const LayoutBaseComponents: React.FC<ILayoutBaseProps> = ({
  header,
  aside,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box role="header" height="100vh" marginLeft={theme.spacing(32)}>
        {header}
      </Box>

      <Box role="aside">{aside}</Box>
    </>
  );
};

export const LayoutBase: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      gap={1}
      bgcolor={theme.palette.background.default}
    >
      <LayoutBaseComponents header={<Header />} aside={<MenuLateral />} />

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
