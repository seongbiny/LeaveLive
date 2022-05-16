import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { IValues } from "../../../pages/diary/write";

interface IPropTypes {
  values: IValues;
  setValues: Dispatch<SetStateAction<IValues>>;
}

const Container = styled.div`
  & > div {
    margin-bottom: 1rem;
  }
`;

const InputForm = ({ values, setValues }: IPropTypes) => {
  const [tag, setTag] = useState<string>("");
  const handleChange = useCallback(
    ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = {
        ...values,
        [id]: value,
      };
      setValues(nextValues);
    },
    [values, setValues]
  );

  const handleTag = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      console.log(">_<");
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
        // onChange={handleChange}
        style={{ width: "100%" }}
        placeholder="태그를 입력하고 스페이스나 엔터를 눌러주세요!"
      />
      <TextField
        label="오늘은 어떤 일이 있었나요?"
        id="content"
        multiline
        rows={6}
        value={values.content}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <TextField
        label="태그"
        id="tag"
        onKeyUp={handleTag}
        value={tag}
        onChange={() => setTag}
        style={{ width: "100%" }}
        placeholder="태그를 입력하고 스페이스나 엔터를 눌러주세요!"
      />
    </Container>
  );
};

export default InputForm;
