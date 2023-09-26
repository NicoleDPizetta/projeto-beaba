import { createTheme } from "@mui/material";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#008D53",
      light: "#39B549",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#F2CA30",
      light: "#FDEC00",
      contrastText: "#242424",
    },
    info: {
      main: "#383838",
      light: "#C7C7C7",
      dark: "#242424",
      contrastText: "#FFF",
    },
    background: {
      default: "#EFF6F1",
      paper: "#FFF"
    },
  },
});
