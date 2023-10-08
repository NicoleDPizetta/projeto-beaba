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
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: "#39B549",
              color: '#fff',
            }),
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#FFF",
          "&.Mui-checked": {
            color: "#FFF",
          },
          "&.Mui-checked + .MuiTypography-root": {
            color: "#FFF",
          },
        },
      },
      defaultProps: {
        size: "small",
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "1rem",
          letterSpacing: "0.13rem",
          borderRadius: 0,
          border: 0,
          backgroundColor: "#FFF",
          '&$selected': {
            backgroundColor: "#FFF",
          },
        },
      }
    }
  },
});
