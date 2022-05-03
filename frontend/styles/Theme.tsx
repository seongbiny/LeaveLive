import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#60ffc6",
      main: "#00cf95",
      dark: "#009d67",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Noto Sans KR",
  },
});

export default theme;
