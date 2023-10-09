import { ReactNode } from "react";
import { Box } from "@mui/material";

export const GridBase: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      width={"95%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      marginX={"auto"}
      paddingLeft={6}
    >
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
        rowGap={4}
        columnGap={6}
      >
        {children}
      </Box>
    </Box>
  );
};
