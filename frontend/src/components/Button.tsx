import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface IPropTypes {
  title: string;
  onPress: () => void;
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.main};
  padding: 10px;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.white};
`;

const Button = ({ title, onPress }: IPropTypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
      <Container>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
