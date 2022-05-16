import React, { Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IValues } from "../../../pages/diary/write";
import { flexCenter } from "../../../styles/Basic";
import theme from "../../../styles/Theme";

interface IPropTypes {
  text: string;
  index: number;
  values: IValues;
  setValues: Dispatch<SetStateAction<IValues>>;
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
    margin-right: 0.3rem;
    margin-bottom: 2px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Tag = ({ text, index, values, setValues }: IPropTypes) => {
  const handleClick = useCallback(() => {
    const nextTags = values.tags.filter((tag, idx) => idx !== index);
    const nextValues = {
      ...values,
      tags: nextTags,
    };
    setValues(nextValues);
  }, [values.tags]);

  return (
    <Container
      backgroundColor={theme.palette.primary.light}
      onClick={handleClick}
    >
      <span>{text}</span>
      <CloseIcon fontSize="small" color="primary" />
    </Container>
  );
};

export default Tag;
