import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import theme from "../../styles/Theme";

interface IPropTypes {
  text: string;
}

interface IContainer {
  backgroundColor: string;
}

const Container = styled.div<IContainer>`
  ${flexCenter}
  background-color: #dffff4;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.8rem;
  & > span {
    margin-bottom: 2px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Tag = ({ text }: IPropTypes) => {
  return (
    <Container backgroundColor={theme.palette.primary.light}>
      <span>{text}</span>
    </Container>
  );
};

export default Tag;
