import React, { Dispatch, SetStateAction, useCallback } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const CeoLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <div>
      사장님 <GoogleLoginButton />
      <div>
        사용자이신가요?
        <span onClick={() => setIsUser(true)}>사용자 로그인</span>
      </div>
    </div>
  );
};

export default CeoLogin;
