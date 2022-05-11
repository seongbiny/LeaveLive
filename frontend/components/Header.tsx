import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import styled from "styled-components";
import { flexCenter } from "../styles/Basic";
import { useRouter } from "next/router";

interface IPropTypes {
  title: string;
  hide?: boolean;
}

const Container = styled.div`
  ${flexCenter}
  position: sticky;
  top: 0;
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
const Header = ({ title, hide }: IPropTypes) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    if (hide) setIsShow(false);
  }, [hide]);

  return (
    <Container>
      <Wrapper>
        {isShow ? (
          <BackButton onClick={() => router.back()}>
            <ArrowBackIosNewRoundedIcon />
          </BackButton>
        ) : null}

        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export default Header;
