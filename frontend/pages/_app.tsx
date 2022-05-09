import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { store, wrapper } from "../store";
import Layout from "../components/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/Theme";
import { useEffect } from "react";
import { getRefreshToken } from "../api/user";
import { setIsLogin } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const allowedURLs = ["/", "/login"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 자동 로그인 처리
  useEffect(() => {
    function autoLogin() {
      const isLogin = store.getState().user.isLogin;
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      // console.log(access_token + " " + refresh_token);

      if (access_token && refresh_token && !isLogin) {
        // getRefreshToken(
        //   null,
        //   (response: object) => {},
        //   (error: Error) => {}
        // );
        store.dispatch(setIsLogin(true));
      }

      if (!isLogin && !allowedURLs.includes(router.pathname)) {
        router.push("/");
      }
    }

    store.subscribe(autoLogin);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyle />
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
