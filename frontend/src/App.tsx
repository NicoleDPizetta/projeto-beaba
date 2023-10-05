import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./shared/themes";
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';

export const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>

        <MenuLateral>
          <AppRoutes />
        </MenuLateral>

      </BrowserRouter>
    </ThemeProvider>
  );
};
