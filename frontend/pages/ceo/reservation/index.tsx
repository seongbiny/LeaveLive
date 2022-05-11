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
            userName: d.userId,
            cnt: d.cnt,
            bnbName: d.accommodationArticle.name,
            startDate: d.startDate,
            endDate: d.endDate,
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
  return <div>테스트</div>;
};

export default MyReservation;
