import React, { useState } from "react";
import styled from "styled-components/native";
import UserLogin from "../components/UserLogin";
import CeoLogin from "../components/CeoLogin";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.main};
  font-weight: bold;
  font-size: 30px;
`;
const Login = () => {
  const [isUser, setIsUser] = useState<boolean>(true);

  return (
    <Container>
      <StyledText>
        {isUser ? (
          <UserLogin setIsUser={setIsUser} />
        ) : (
          <CeoLogin setIsUser={setIsUser} />
        )}
      </StyledText>
    </Container>
  );
};

export default Login;
