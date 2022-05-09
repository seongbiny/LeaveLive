import React, { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";

interface IPropTypes {
  setAddress?: Dispatch<SetStateAction<object>>;
}

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  & > div {
    margin-bottom: 1rem;
  }
`;

const Wrapper = styled.div`
  ${flexCenter}
`;

const Postcode = ({ setAddress }: IPropTypes) => {
  return (
    <Container>
      <Wrapper>
        <TextField
          required
          label="우편번호"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          style={{ flex: 2.5 }}
        />
        <Button
          variant="outlined"
          size="large"
          style={{ flex: 1, padding: "13.875px 21px", marginLeft: "1rem" }}
        >
          주소 검색
        </Button>
      </Wrapper>
      <TextField
        required
        label="주소 1"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        style={{ width: "100%" }}
        placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요."
      />
      <TextField
        label="주소 2"
        variant="outlined"
        style={{ width: "100%" }}
        placeholder="입력하신 주소 뒤 상세 주소를 넣어주세요."
      />
    </Container>
  );
};

export default Postcode;
