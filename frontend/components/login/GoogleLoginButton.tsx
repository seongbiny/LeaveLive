import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLoginRequest } from "../../api/user";
import styled from "styled-components";

const GoogleButton = styled.button`
  width: 191px;
  height: 46px;
  background-image: url("google_button.png");
  outline: none;
  border: none;
`;

const GoogleLoginButton = () => {
  const onSuccess = useCallback((response: object) => {
    console.log(response);
    GoogleLoginRequest(
      JSON.stringify(response),
      ({ data }: any) => {
        console.log(response);

        const authorization = `Bearer ${data[0]}`;
        const refreshtoken = `Refresh Bearer ${data[1]}`;

        localStorage.setItem("authorization", authorization);
        localStorage.setItem("refreshtoken", refreshtoken);
      },
      (error: Error) => console.log(error)
    );
  }, []);

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
