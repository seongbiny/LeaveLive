import React from "react";
import { IActivity } from "./Calendar";
import styled from "styled-components";
import { format } from "date-fns";
import { flexCenter } from "../../styles/Basic";

interface IPropTypes {
  activity: IActivity;
}

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  line-height: 1.8rem;
`;

const TitleContainer = styled.div`
  ${flexCenter}
  justify-content: space-between;
`;

const Activity = ({ activity }: IPropTypes) => {
  return (
    <Container>
      <TitleContainer>
        <div style={{ fontWeight: "bold", fontSize: "1.05rem", flex: 4 }}>
          {activity.name}
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>{activity.cnt}명</div>
      </TitleContainer>
      <div style={{ fontSize: "0.9rem" }}>
        {format(activity.startDate, "yyyy.MM.dd")} ~{" "}
        {format(activity.endDate, "yyyy.MM.dd")}
      </div>
    </Container>
  );
};

export default Activity;
