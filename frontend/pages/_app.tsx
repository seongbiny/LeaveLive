import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { store } from "../store";
import { Provider } from "react-redux";
import Layout from "../src/components/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import useIsMobile from "../util/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const isMobile = useIsMobile();
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
