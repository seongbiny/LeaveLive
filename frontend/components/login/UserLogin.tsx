import React, { Dispatch, SetStateAction } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const UserLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <div>
      사용자
      <GoogleLoginButton />
      <KakaoLoginButton />
      <div>
        사장님이세요?
        <span onClick={() => setIsUser(false)}>사장님 로그인</span>
      </div>
    </div>
  );
};

export default UserLogin;
