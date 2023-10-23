import { ThemeProvider } from "@mui/material";
import { Theme } from "./shared/themes";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};
