import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import styled from "styled-components";
import { flexCenter } from "../styles/Basic";
import { useRouter } from "next/router";

interface IPropTypes {
  title: string;
}

const Container = styled.div`
  ${flexCenter}
  position: sticky;
  background-color: white;
  width: 100%;
  padding: 1rem 0;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const BackButton = styled.div`
  ${flexCenter}
  position: absolute;
  left: 3%;
`;

const Title = styled.div`
  text-align: center;
`;
const Header = ({ title }: IPropTypes) => {
  const router = useRouter();
  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => router.back()}>
          <ArrowBackIosNewRoundedIcon />
        </BackButton>

        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export default Header;
