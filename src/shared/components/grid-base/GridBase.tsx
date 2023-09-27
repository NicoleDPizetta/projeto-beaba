import { ReactNode } from "react";
import { Box } from "@mui/material";

export const GridBase: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"0 .5rem"}
    >
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
        rowGap={4}
        columnGap={6}
        padding={"0 .5rem"}
      >
        {children}
      </Box>
    </Box>
  );
};
