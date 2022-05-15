import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLoginRequest } from "../../api/user";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks";
import { setIsLogin, setType } from "../../store/slices/userSlice";
import { getUserInfo } from "../../api/user";

const GoogleButton = styled.button`
  width: 191px;
  height: 46px;
  background-image: url("google_button.png");
  outline: none;
  border: none;
`;

const GoogleLoginButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(
    (response: object) => {
      GoogleLoginRequest(
        JSON.stringify(response),
        ({ data }: any) => {
          localStorage.setItem("access_token", data[0]);
          localStorage.setItem("refresh_token", data[1]);

          dispatch(setIsLogin(true));
          getUserInfo(
            null,
            ({ data }: any) => {
              console.log(data);
              dispatch(setType(data.type));

              if (data.type === "USER") router.push("/main");
              else router.push("/ceo");
            },
            (error: Error) => console.log(error)
          );
        },
        (error: Error) => console.log(error)
      );
    },
    [router, dispatch]
  );

  return (
    <GoogleLogin
      theme="dark"
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      buttonText="Google 로그인"
      onSuccess={onSuccess}
      onFailure={(error) => console.log(error)}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => <GoogleButton onClick={renderProps.onClick} />}
    />
  );
};

export default GoogleLoginButton;
