import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./shared/themes";
import { PaginaInicial } from "./pages";

export const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <PaginaInicial />
      </BrowserRouter>
    </ThemeProvider>
  );
};
