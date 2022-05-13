import React from "react";
import { IReservation } from "../../pages/ceo/reservation";
import styled from "styled-components";

interface IPropTypes {
  reservation: IReservation;
  isLast: boolean;
}

interface IContainer {
  isLast: boolean;
}

const Container = styled.div<IContainer>`
  width: 100%;
  padding: 1rem 0;
  border-bottom: ${({ isLast }) => (isLast ? "none" : "1px solid lightgray")};
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const UserPrice = styled.div`
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReservationList = ({ reservation, isLast }: IPropTypes) => {
  return (
    <Container isLast={isLast}>
      <div>
        <UserName>
          {reservation.userName} ({reservation.cnt}명)
        </UserName>
        <div>{reservation.bnbName}</div>
        <div>
          {reservation.startDate} ~ {reservation.endDate}
        </div>
      </div>
      <UserPrice>{reservation.price.toLocaleString()}원</UserPrice>
    </Container>
  );
};

export default ReservationList;
