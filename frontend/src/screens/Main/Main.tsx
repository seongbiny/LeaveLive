import React from "react";
import { Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainParamList } from "../../navigations/MainNavigator";
import styled from "styled-components/native";

type MainScreenNavigationProp = StackNavigationProp<MainParamList, "Main">;
type Props = { navigation: MainScreenNavigationProp };

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Main = ({ navigation }: Props) => {
  return (
    <Container>
      <Text>리브리브</Text>
      <Button
        title="로그인 페이지(테스트용)"
        onPress={() => navigation.navigate("Login", { type: "user" })}
      ></Button>
    </Container>
  );
};

export default Main;
