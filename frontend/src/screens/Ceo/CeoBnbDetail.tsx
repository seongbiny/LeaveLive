import React from "react";
import { Text, Button } from "react-native";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigations/CeoStack/CeoListStack";

type CeoHomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "CeoBnbList"
>;
type Prop = { navigation: CeoHomeScreenNavigationProp };

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CeoBnbDetail = ({ navigation }: Prop) => {
  return (
    <Container>
      <Text>CeoBnbDetail</Text>
      <Button
        title="수정하기"
        onPress={() => navigation.navigate("CeoBnbUpdate")}
      />
    </Container>
  );
};

export default CeoBnbDetail;
