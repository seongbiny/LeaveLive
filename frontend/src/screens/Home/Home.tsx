import React from "react";
import { Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainParamList } from "../../navigations/UserStack/HomeStack";
import styled from "styled-components/native";

type MainScreenNavigationProp = StackNavigationProp<MainParamList, "Home">;
type Props = { navigation: MainScreenNavigationProp };

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home = ({ navigation }: Props) => {
  return (
    <Container>
      <Text>리브리브</Text>
      <Button
        title="로그인 페이지(테스트용)"
        onPress={() => navigation.navigate("Login")}
      ></Button>
      <Button
        title="제바렞ㄷㅂㅈㅂ"
        onPress={() => navigation.navigate("LoginTest")}
      ></Button>
    </Container>
  );
};

export default Home;
