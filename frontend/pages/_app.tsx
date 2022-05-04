import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { store } from "../store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/Theme";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Provider store={store}>
          <GlobalStyle />
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
