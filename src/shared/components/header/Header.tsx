import { Box, Button, TextField, Paper, useTheme } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { MenuContaUsuario } from "../menu-conta-usuario/MenuContaUsuario";

interface IHeaderProps {
  textoDaBusca?: string;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
}

export const Header: React.FC<IHeaderProps> = ({
  textoDaBusca = "",
  aoMudarTextoDeBusca,
}) => {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
    >
      <Box display="flex" justifyContent="start">
          <TextField
            size="small"
            value={textoDaBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
            placeholder="Pesquisar"
            type="search"
          />
        <Button variant="contained" color="primary" disableElevation>
          <SearchOutlinedIcon />
        </Button>
      </Box>

      <Box flex={1} display="flex" justifyContent="end">
        <MenuContaUsuario />
      </Box>
    </Box>
  );
};
