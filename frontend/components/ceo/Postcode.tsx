import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import SearchPostcode from "../../components/ceo/SearchPostcode";

interface IPropTypes {
  address?: String;
  setAddress: Dispatch<SetStateAction<String>>;
  addressDetail?: String;
  setAddressDetail: Dispatch<SetStateAction<String>>;
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

const Postcode = ({
  address,
  setAddress,
  addressDetail,
  setAddressDetail,
}: IPropTypes) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleChange = useCallback(
    ({ target: { value } }: any) => {
      setAddressDetail(value);
    },
    [setAddressDetail]
  );
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
          onClick={() => {
            document.body.style.overflow = "hidden";
            setIsShow(true);
          }}
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
        value={address}
      />
      <TextField
        label="주소 2"
        variant="outlined"
        style={{ width: "100%" }}
        placeholder="입력하신 주소 뒤 상세 주소를 넣어주세요."
        value={addressDetail}
        onChange={handleChange}
      />
      <SearchPostcode
        isShow={isShow}
        setIsShow={setIsShow}
        setAddress={setAddress}
      />
    </Container>
  );
};

export default Postcode;
