import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { Text, BoldMainText, BoldText, UnderlineText } from "../Text";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.View``;

const UserLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <Container>
      <TitleText>
        <BoldMainText size={32} lineHeight={50}>
          오늘은{"\n"}어디서 살아볼까?
        </BoldMainText>
        <BoldText size={20}>국내여행 한달살기, 앱 하나로 끝!</BoldText>
        <BoldMainText size={28}>리브리브</BoldMainText>
      </TitleText>
      <Text>
        사장님이세요?&nbsp;
        <TouchableWithoutFeedback onPress={() => setIsUser((prev) => !prev)}>
          <UnderlineText>사장님 로그인</UnderlineText>
        </TouchableWithoutFeedback>
      </Text>
    </Container>
  );
};

export default UserLogin;
