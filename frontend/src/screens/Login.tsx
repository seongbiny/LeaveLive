import React, { useState } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

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
  const [isUser, setIsUser] = useState(true);
  return (
    <Container>
      <StyledText>
        {isUser ? "오늘은 어디서 살아볼까?" : "반갑습니다, 사장님!"}
      </StyledText>
      <Button title="버튼" onPress={() => setIsUser((prev) => !prev)} />
    </Container>
  );
};

export default Login;
