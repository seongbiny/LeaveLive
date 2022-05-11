import React from "react";
import styled from "styled-components";
import { WideButton } from "../WideButton";

interface IPropTypes {
  price: number;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: gray;
  padding: 1rem;
`;

const DetailNav = ({ price }: IPropTypes) => {
  return (
    <Container>
      {price.toLocaleString()}원 / 1박{" "}
      <WideButton text="수정하기" onClick={() => {}} />
    </Container>
  );
};

export default DetailNav;
