import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { store } from "../store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <Layout>
        <Provider store={store}>
          <GlobalStyle />
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </Layout>
  );
}

export default MyApp;
