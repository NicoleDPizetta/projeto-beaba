import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";

interface ILayoutBaseProps {
  header: ReactNode;
  children: ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({
  children,
  header,
}) => {
  const theme = useTheme();

  return (
    <Box minHeight="100%" display="flex" flexDirection="column" gap={1} bgcolor={theme.palette.background.default}>
      <Box role="header">{header}</Box>

      <Box display='flex' flexWrap='wrap' padding='2rem 2rem'>
        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
