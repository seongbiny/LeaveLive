import React, { useCallback } from "react";

const KakaoLoginButton = () => {
  const onLoginRequest = useCallback(() => {
    location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/login/oauth2/redirect`;
  }, []);

  return <button onClick={onLoginRequest}>카카오 계정으로 로그인</button>;
};

export default KakaoLoginButton;
