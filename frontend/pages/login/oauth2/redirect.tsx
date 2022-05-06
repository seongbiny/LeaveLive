import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { KakaoLoginRequest } from "../../../api/user";
import axios from "axios";
import { FRONTEND_URL } from "../../../api";
import { useAppDispatch } from "../../../hooks";
import { setIsLogin } from "../../../store/slices/userSlice";

const Redirect = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 회원가입/로그인 성공시 callback 함수
  const onLoginSuccess = useCallback(
    // 받아온 jwt token들을 localStorage에 저장
    ({ data: { access_token, refresh_token } }: any) => {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      dispatch(setIsLogin(true));
    },
    [dispatch]
  );

  // kakao 토큰 성공 시 callback 함수
  const onKakaoGetTokenSuccess = useCallback(
    ({ data: { access_token } }: any) => {
      console.log(access_token);
      const params = {
        token: access_token,
      };

      KakaoLoginRequest(params, onLoginSuccess, (error: Error) =>
        console.log(error)
      );

      // 메인 화면으로 이동
      router.push("/");
    },
    [router, onLoginSuccess]
  );

  // kakao에서 토큰 받아오는 함수
  const kakaoGetToken = useCallback(
    (code: string) => {
      const params: any = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        redirect_uri: `${FRONTEND_URL}/login/oauth2/redirect`,
        code,
      };

      const queryParams = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURI(params[k]))
        .join("&");

      axios
        .post(`https://kauth.kakao.com/oauth/token`, queryParams, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(onKakaoGetTokenSuccess)
        .catch((error: Error) => console.log(error));
    },
    [onKakaoGetTokenSuccess]
  );

  useEffect(() => {
    if (router.query.code) {
      const code = String(router.query.code);
      // getCode(code);
      kakaoGetToken(code);
    }
  }, [router, kakaoGetToken]);

  return null;
};

export default Redirect;
