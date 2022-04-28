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

const CeoLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <Container>
      <TitleText>
        <BoldMainText size={32} lineHeight={50}>
          반갑습니다,{"\n"}사장님!
        </BoldMainText>

        <BoldText size={22}>
          <BoldMainText size={28}>리브리브</BoldMainText>가{"\n"}
          <BoldMainText size={28}>편한 예약 관리</BoldMainText>를{"\n"}
          도와드려요.
        </BoldText>
      </TitleText>
      <Text>
        사용자세요?&nbsp;
        <TouchableWithoutFeedback onPress={() => setIsUser((prev) => !prev)}>
          <UnderlineText>사용자 로그인</UnderlineText>
        </TouchableWithoutFeedback>
      </Text>
    </Container>
  );
};

export default CeoLogin;
