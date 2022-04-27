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

const CeoBnbList = ({ navigation }: Prop) => {
  return (
    <Container>
      <Text>CeoBnbList</Text>
      <Button
        title="숙소 상세보기"
        onPress={() => navigation.navigate("CeoBnbDetail")}
      />
      <Button
        title="새 숙소 등록하기"
        onPress={() => navigation.navigate("CeoBnbCreate")}
      />
    </Container>
  );
};

export default CeoBnbList;
