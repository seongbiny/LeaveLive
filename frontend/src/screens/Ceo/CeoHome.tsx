import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CeoHome = () => {
  return (
    <Container>
      <Text>CeoHome</Text>
    </Container>
  );
};

export default CeoHome;
