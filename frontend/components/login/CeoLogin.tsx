import React, { Dispatch, SetStateAction } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import { ColoredText, UnderlineText } from "../../styles/Text";
import { Typography } from "@mui/material";
import {
  TextContainer,
  Title,
  SubTitleContainer,
  ButtonContainer,
  NavigatorContainer,
} from "./UserLogin";
import { Wrapper } from "../../styles/Basic";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const CeoLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <Wrapper width={65}>
      <TextContainer>
        <Title>
          <Typography variant="h5">
            <ColoredText>반갑습니다, 사장님!</ColoredText>
          </Typography>
        </Title>

        <SubTitleContainer>
          <ColoredText>리브리브</ColoredText>가<br />
          <ColoredText>편한 예약 관리</ColoredText>를<br />
          도와드려요.
        </SubTitleContainer>
      </TextContainer>

      <ButtonContainer>
        <GoogleLoginButton type="PROVIDER" />
        <KakaoLoginButton type="PROVIDER" />
      </ButtonContainer>
      <NavigatorContainer>
        사용자이신가요?&nbsp;
        <UnderlineText onClick={() => setIsUser(true)}>
          사용자 로그인
        </UnderlineText>
      </NavigatorContainer>
    </Wrapper>
  );
};

export default CeoLogin;
