import React, { useEffect, useState } from "react";
import { getMyReservationList } from "../../../api/ceo";

interface IReservation {
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

        console.log(reservationList);
        setReservations(reservationList);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const [reservations, setReservations] = useState<Array<IReservation>>();
  return (
    <div>
      {reservations?.map((reservation, index) => (
        <div key={index}>{reservation.bnbName}</div>
      ))}
    </div>
  );
};

export default MyReservation;
