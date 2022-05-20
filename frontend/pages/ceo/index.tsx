import React, { useEffect, useState } from "react";
import { ColoredText, BoldText } from "../../styles/Text";
import styled from "styled-components";
import { Container, Wrapper } from "../../styles/Basic";
import { getMyReservationList } from "../../api/ceo";
import { IReservation } from "./reservation";
import Seo from "../../components/Seo";

const TextContainer = styled.div`
  font-size: 1.3rem;
  line-height: 2.2rem;
`;

const Ceo = () => {
  const [reservation, setReservation] = useState<number>(0);
  const [customers, setCustomers] = useState<number>(0);
  const [pay, setPay] = useState<number>(0);

  useEffect(() => {
    getMyReservationList(
      null,
      ({ data }: any) => {
        const reservationList: Array<IReservation> = [];
        data.forEach((d: any) => {
          const reservation: IReservation = {
            userName: d.nickname,
            cnt: d.cnt,
            bnbName: d.accommodationArticle.name,
            startDate: d.startDate.join("."),
            endDate: d.endDate.join("."),
            price: d.accommodationArticle.price * d.cnt,
          };

          reservationList.push(reservation);
        });

        cntReservationInfo(reservationList);
      },
      (error: Error) => console.log(error)
    );

    function cntReservationInfo(reservationList: Array<IReservation>) {
      const today = new Date();

      // 테스트용으로 더미데이터 해당하는 날짜 넣어둔 것.
      // const today = new Date("2022.5.1");
      const result = reservationList.filter(
        (reservation: IReservation) =>
          new Date(reservation.startDate) <= today &&
          today <= new Date(reservation.endDate)
      );

      setReservation(result.length);
      let customers = 0;
      let pay = 0;
      result.forEach((reservation: IReservation) => {
        customers += reservation.cnt;
        pay += reservation.price;
      });

      setCustomers(customers);
      setPay(pay);
    }
  }, []);

  return (
    <Container>
      <Seo title="사장님" />
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
