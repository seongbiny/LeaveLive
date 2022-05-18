import React from "react";
import { ISchedule } from "./Calendar";
import styled from "styled-components";
import { format } from "date-fns";
import { flexCenter } from "../../styles/Basic";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SportsBaseballRoundedIcon from "@mui/icons-material/SportsBaseballRounded";

interface IPropTypes {
  schedule: ISchedule;
}

const Container = styled.div`
  width: 100%;
  margin: 0.8rem 0;
  line-height: 1.8rem;
`;

const TitleContainer = styled.div`
  ${flexCenter}
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  flex: 4;
`;

const Activity = ({ schedule }: IPropTypes) => {
  return (
    <Container>
      <TitleContainer>
        <NameContainer>
          {schedule.type === "BNB" ? (
            <HomeRoundedIcon color="primary" style={{ marginRight: "5px" }} />
          ) : (
            <SportsBaseballRoundedIcon
              color="primary"
              style={{ marginRight: "5px" }}
            />
          )}
          {schedule.name}
        </NameContainer>
        <div style={{ flex: 1, textAlign: "right" }}>{schedule.cnt}명</div>
      </TitleContainer>
      <div style={{ fontSize: "0.9rem" }}>
        {format(schedule.startDate, "yyyy.MM.dd")} ~{" "}
        {format(schedule.endDate, "yyyy.MM.dd")}
      </div>
    </Container>
  );
};

export default Activity;
