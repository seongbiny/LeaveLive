import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLoginRequest } from "../../api/user";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks";
import { setIsLogin } from "../../store/slices/userSlice";

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
          router.push("/");
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
