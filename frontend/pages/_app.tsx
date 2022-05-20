import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { store, wrapper } from "../store";
import Layout from "../components/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/Theme";
import { useEffect } from "react";
import { getRefreshToken, getUserInfo } from "../api/user";
import { setIsLogin, setUserInfo } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
config.autoAddCss = false;

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
        getUserInfo(
          null,
          ({ data: { nickname, picPath, type } }: any) => {
            store.dispatch(
              setUserInfo({
                nickname,
                picPath: picPath === "" ? "/profile.png" : picPath,
                type,
              })
            );
          },
          (error: Error) => console.log(error)
        );
      }
    }

    autoLogin();
    // store.subscribe(autoLogin);

    const isLogin = store.getState().user.isLogin;
    const type = store.getState().user.type;
    if (!isLogin) {
      // if (!allowedURLs.includes(router.pathname)) router.push("/");
    } else {
      // if (type === "USER" && router.pathname.startsWith("ceo"))
      //   router.push("/main");
      // if (type === "CEO" && !router.pathname.startsWith("ceo"))
      //   router.push("/ceo");
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Script
          src={`//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`}
        />
        <GlobalStyle />
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
