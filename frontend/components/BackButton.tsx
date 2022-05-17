import React, { useCallback } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import styled from "styled-components";
import { flexCenter } from "../styles/Basic";
import { useRouter } from "next/router";

const Container = styled.div`
  ${flexCenter}
`;

const BackButton = () => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Container onClick={handleClick}>
      <ArrowBackIosNewRoundedIcon />
    </Container>
  );
};

export default BackButton;
