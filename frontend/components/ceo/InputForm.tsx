import React, { Dispatch, SetStateAction, useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { IValues } from "../../pages/ceo/bnb/create";
import styled from "styled-components";

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

  return (
    <Container>
      <TextField
        label="숙소 이름"
        required
        id="name"
        value={values.name}
        onChange={handleChange}
        style={{ width: "100%" }}
        placeholder="숙소의 이름을 적어주세요."
      />
      <TextField
        label="숙소 설명"
        id="description"
        multiline
        rows={4}
        value={values.description}
        onChange={handleChange}
        style={{ width: "100%" }}
        placeholder="이 숙소는 어떤 곳인가요? 설명을 적어주세요."
      />
      <TextField
        label="숙소 가격 (1박)"
        required
        id="price"
        value={values.price}
        onChange={handleChange}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">원</InputAdornment>,
        }}
        style={{ width: "100%" }}
        placeholder="1박 시 1명 기준 요금을 작성해 주세요."
      />
      <TextField
        label="최대 인원"
        required
        id="people"
        value={values.people}
        onChange={handleChange}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">명</InputAdornment>,
        }}
        style={{ width: "100%" }}
        placeholder="한 방에 최대 몇 명까지 들어갈 수 있나요?"
      />
    </Container>
  );
};

export default InputForm;
