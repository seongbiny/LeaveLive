import React from "react";
import styled from "styled-components";
import { WideButton } from "../WideButton";
import { flexCenter } from "../../styles/Basic";

interface IPropTypes {
  price: number;
}

const Container = styled.div`
  ${flexCenter}
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #dffff4;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1rem 2rem;
  z-index: 2;
`;

const Price = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;
const DetailNav = ({ price }: IPropTypes) => {
  return (
    <Container>
      <Price>{price.toLocaleString()}원 / 1박 </Price>
      <div style={{ width: "50%" }}>
        <WideButton text="수정하기" onClick={() => {}} />
      </div>
    </Container>
  );
};

export default DetailNav;
