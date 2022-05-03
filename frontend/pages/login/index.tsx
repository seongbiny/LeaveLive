import React, { useState, useCallback } from "react";

import { GoogleLoginRequest } from "../../api/user";
import UserLogin from "../../components/login/UserLogin";
import CeoLogin from "../../components/login/CeoLogin";

const Login = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  return (
    <>
      {isUser ? (
        <UserLogin setIsUser={setIsUser} />
      ) : (
        <CeoLogin setIsUser={setIsUser} />
      )}
    </>
  );
};

export default Login;
