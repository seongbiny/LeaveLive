import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";

const Container = styled.div`
  ${flexCenter}
  width: 80%;
  justify-content: flex-end;
  font-size: 0.8rem;
`;

const DotContainer = styled.div`
  ${flexCenter}

  &:not(:last-of-type) {
    margin-right: 0.7rem;
  }
`;

interface IDot {
  color: string;
}

const Dot = styled.div<IDot>`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  margin-right: 0.3rem;
`;

const CalendarDotInfo = () => {
  return (
    <Container>
      <DotContainer>
        <Dot color="orange"></Dot>
        <div>일기 쓴 날</div>
      </DotContainer>
      <DotContainer>
        <Dot color="hotpink"></Dot>
        <div>숙소</div>
      </DotContainer>
      <DotContainer>
        <Dot color="skyblue"></Dot>
        <div>액티비티</div>
      </DotContainer>
    </Container>
  );
};

export default CalendarDotInfo;
