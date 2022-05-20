import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../styles/Basic";
import BackButton from "../components/BackButton";

interface IPropTypes {
  title: string;
  hide?: boolean;
  menuText?: string;
  onClick?: () => void;
}

const Container = styled.div`
  ${flexCenter}
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  padding: 1rem 0;
  z-index: 2;
`;

const Wrapper = styled.div`
  ${flexCenter}
  position: relative;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  flex: 5;
`;

const MenuContainer = styled.div`
  flex: 1;
  &:hover {
    cursor: pointer;
  }
`;

const Header = ({ title, hide, menuText, onClick }: IPropTypes) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    if (hide) setIsShow(false);
  }, [hide]);

  return (
    <Container>
      <Wrapper>
        <MenuContainer>{isShow ? <BackButton /> : null}</MenuContainer>
        <Title>{title}</Title>

        <MenuContainer onClick={onClick}>
          {menuText ? menuText : null}
        </MenuContainer>
      </Wrapper>
    </Container>
  );
};

export default Header;
