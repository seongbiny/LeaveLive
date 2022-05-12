import React, { useState } from "react";
import { ColoredText, BoldText } from "../../styles/Text";
import styled from "styled-components";
import { Container, Wrapper } from "../../styles/Basic";

const TextContainer = styled.div`
  font-size: 1.3rem;
  line-height: 2.2rem;
`;

const Ceo = () => {
  const [reservation, setReservation] = useState<number>(3);
  const [customers, setCustomers] = useState<number>(7);
  const [pay, setPay] = useState<number>(540000);

  return (
    <Container>
      <Wrapper>
        <TextContainer>
          <BoldText>
            오늘은&nbsp;
            <ColoredText>{reservation}</ColoredText>건의 예약,
            <br />
            <ColoredText>{customers}</ColoredText>명의 손님,
            <br />
            <ColoredText>{pay.toLocaleString("ko-KR")}</ColoredText>원의
            <br />
            수입이 있어요.
          </BoldText>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default Ceo;
