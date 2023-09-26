import { ReactNode } from "react";
import { Box } from "@mui/system";
import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface ILayoutBaseProps {
  titulo: string;
  header: ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({
  children,
  titulo,
  header,
}) => {
  const theme = useTheme();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box role="header">{header}</Box>

      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
      >
        <Typography
          variant="h5"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {titulo}
        </Typography>
      </Box>

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
