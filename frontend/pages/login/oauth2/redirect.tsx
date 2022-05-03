import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { KakaoLoginRequest } from "../../../api/user";

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.code) {
      const code = String(router.query.code);
      console.log(code);
      KakaoLoginRequest(
        code,
        (response: any) => {
          console.log(response);
        },
        (error: Error) => {
          console.log(error);
        }
      );
    }
  }, [router]);
  // useEffect(() => {
  //   const router = useRouter();

  //   if (router.query.token && router.query.refreshtoken) {
  //     /** LocalStorage에 token들 저장 */
  //     const authorization = `Bearer ${router.query.token}`;
  //     const refreshtoken = `Refresh Bearer ${router.query.refreshToken}`;

  //     localStorage.setItem("authorization", authorization);
  //     localStorage.setItem("refreshtoken", refreshtoken);

  //     // todo: user 정보를 불러옴
  //   }

  //   // 메인 화면으로 이동
  //   router.push("/");
  // }, []);

  return null;
};

export default Redirect;
