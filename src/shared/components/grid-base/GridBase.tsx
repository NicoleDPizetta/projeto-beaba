import { ReactNode } from "react";
import { Box } from "@mui/material";

export const GridBase: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      rowGap={"2rem"}
      columnGap={"4rem"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      marginX={"auto"}
      padding={"0 .5rem"}
    >
      {children}
    </Box>
  );
};
