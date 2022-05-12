import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../styles/Basic";
import BackButton from "../components/BackButton";

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

const Title = styled.div`
  text-align: center;
`;
const Header = ({ title, hide }: IPropTypes) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    if (hide) setIsShow(false);
  }, [hide]);

  return (
    <Container>
      <Wrapper>
        {isShow ? <BackButton /> : null}

        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
};

export default Header;
