import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CeoMain = () => {
  return (
    <Container>
      <Text>CeoMain</Text>
    </Container>
  );
};

export default CeoMain;
