import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";

const Container = styled.div`
  ${flexCenter}
  width: 80%;
  justify-content: flex-end;
  font-size: 0.8rem;
  margin-bottom: 2vh;
`;

const DotContainer = styled.div`
  ${flexCenter}

  &:first-of-type {
    margin-right: 0.8rem;
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

const DotInfo = () => {
    return (
        <Container>
            <DotContainer>
                <Dot color="orange"></Dot>
                <div>예약 불가</div>
            </DotContainer>
        </Container>
    )
};
export default DotInfo;
