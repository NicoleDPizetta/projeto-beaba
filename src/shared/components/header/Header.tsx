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
      padding={2}
      paddingX={4}
      display="flex"
      alignItems="center"
      gap={16} 
    >
      <Box flex={2} display="flex" justifyContent="center">
          <TextField
            size="small"
            fullWidth
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
