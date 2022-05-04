import React, { useState } from "react";
import UserLogin from "../../components/login/UserLogin";
import CeoLogin from "../../components/login/CeoLogin";
import styled from "styled-components";
import { flexCenter, Container } from "../../styles/Basic";

const Login = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  return (
    <Container width={65}>
      {isUser ? (
        <UserLogin setIsUser={setIsUser} />
      ) : (
        <CeoLogin setIsUser={setIsUser} />
      )}
    </Container>
  );
};

export default Login;
