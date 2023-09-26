import { Box, Button, TextField, Paper, useTheme  } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const Header: React.FC = () => {
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
      /* justifyContent='space-between' */
      gap={1}
    >

        <Box display='flex' justifyContent='start'>
            <TextField size="small" placeholder="Pesquisar" type="search"/>
            <Button variant="contained" color="primary" disableElevation>
                <SearchOutlinedIcon />
            </Button>
        </Box>

      <Box flex={1} display='flex' justifyContent='end'>
        Meu Perfil
      </Box>
    </Box>
  );
};
