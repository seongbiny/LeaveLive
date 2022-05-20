import React, { useEffect, useState } from "react";
import { getMyReservationList } from "../../../api/ceo";
import ReservationList from "../../../components/ceo/ReservationList";
import Header from "../../../components/Header";
import Seo from "../../../components/Seo";
import { Container } from "../../../styles/Basic";
import { ContentsWrapper } from "../bnb/create";

export interface IReservation {
  userName: string;
  cnt: number;
  bnbName: string;
  startDate: string;
  endDate: string;
  price: number;
}

const MyReservation = () => {
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
        setReservations(reservationList);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const [reservations, setReservations] = useState<Array<IReservation>>();
  return (
    <Container>
      <Seo title="예약확인" />
      <Header title="예약 확인" hide={true} />
      <ContentsWrapper>
        {reservations?.map((reservation, index) => (
          <ReservationList
            key={index}
            reservation={reservation}
            isLast={index === reservations.length - 1 ? true : false}
          ></ReservationList>
        ))}
      </ContentsWrapper>
    </Container>
  );
};

export default MyReservation;
