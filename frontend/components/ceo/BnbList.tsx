import React from "react";
import styled from "styled-components";
import { BACKEND_IMAGE_URL } from "../../api";

interface IPropTypes {
  picPath: string;
  name: string;
  price: number;
  onClick: () => void;
}

const Container = styled.div`
  width: 80%;
  display: flex;
  padding: 1rem 0;
`;

interface IImageContainer {
  url?: any;
}
const ImageContainer = styled.div<IImageContainer>`
  width: 100px;
  height: 75px;

  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const BnbName = styled.div`
  font-weight: bold;
`;

const BnbPrice = styled.div`
  align-self: flex-end;
`;
const BnbList = ({ picPath, name, price, onClick }: IPropTypes) => {
  return (
    <Container onClick={onClick}>
      <ImageContainer url={`${BACKEND_IMAGE_URL}${picPath}`}></ImageContainer>
      <ContentContainer>
        <BnbName>{name}</BnbName>
        <BnbPrice>{price.toLocaleString()}원</BnbPrice>
      </ContentContainer>
    </Container>
  );
};

export default BnbList;
