import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { IValues } from "../../../pages/diary/write";
import Tag from "./Tag";
import { flexCenter } from "../../../styles/Basic";

interface IPropTypes {
  values: IValues;
  setValues: Dispatch<SetStateAction<IValues>>;
}

const Container = styled.div`
  & > div {
    margin-bottom: 1rem;
  }
`;

const TagContainer = styled.div`
  ${flexCenter}
  flex-wrap: wrap;
`;

const InputForm = ({ values, setValues }: IPropTypes) => {
  const [tag, setTag] = useState<string>("");
  const handleChange = useCallback(
    ({
      target: { id, value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValues = {
        ...values,
        [id]: value,
      };
      setValues(nextValues);
    },
    [values, setValues]
  );

  const handleTag = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTag(value);
  };

  const AddTags = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      if (!tag.trim()) {
        setTag("");
        return;
      }

      const nextValues = {
        ...values,
        tags: [...values.tags, tag.trim()],
      };
      setValues(nextValues);
      setTag("");
    }
  };

  return (
    <Container>
      <TextField
        label="날짜"
        id="date"
        value={values.date}
        InputProps={{
          readOnly: true,
        }}
        style={{ width: "100%" }}
      />
      <TextField
        label="오늘은 어떤 일이 있었나요?"
        id="content"
        multiline
        rows={6}
        value={values.content}
        onChange={(event) => handleChange(event)}
        style={{ width: "100%" }}
      />
      <TextField
        // label="태그"
        id="tag"
        onKeyUp={AddTags}
        value={tag}
        onChange={(event) => handleTag(event)}
        style={{ width: "100%" }}
        placeholder="태그를 입력하고 스페이스나 엔터를 눌러주세요!"
      />
      <TagContainer>
        {values.tags.map((tag, index) => (
          <Tag
            key={index}
            text={tag}
            index={index}
            values={values}
            setValues={setValues}
          />
        ))}
      </TagContainer>
    </Container>
  );
};

export default InputForm;
