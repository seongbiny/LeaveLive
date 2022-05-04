import React from "react";
import { ColoredText } from "../../styles/Text";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";

const Container = styled.div`
  width: 80%;
  height: 100%;
  ${flexCenter}
`;

const Ceo = () => {
  return (
    <Container>
      <Typography variant="h4">
        <ColoredText>테스트</ColoredText>
      </Typography>
    </Container>
  );
};

export default Ceo;
