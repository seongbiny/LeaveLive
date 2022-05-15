import React, { useCallback } from "react";
import styled from "styled-components";
import { FRONTEND_URL } from "../../api";

interface IPropTypes {
  type: "USER" | "PROVIDER";
}

const KakaoButton = styled.button`
  width: 183px;
  height: 45px;
  background-image: url("kakao_button.png");
  outline: none;
  border: none;
`;

const KakaoLoginButton = ({ type }: IPropTypes) => {
  const onLoginRequest = useCallback(() => {
    location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${FRONTEND_URL}/login/oauth2/redirect?type=${type}`;
  }, []);

  return <KakaoButton onClick={onLoginRequest}> </KakaoButton>;
};

export default KakaoLoginButton;
