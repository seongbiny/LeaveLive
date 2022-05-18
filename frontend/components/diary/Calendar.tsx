import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as dateFnsLocales from "date-fns/locale";
import { format } from "date-fns";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import theme from "../../styles/Theme";
import { getMyAllDiary } from "../../api/diary";
import { getMyAllActivityReservation } from "../../api/reservation";
import { useRouter } from "next/router";
import CalendarDotInfo from "../../components/diary/CalendarDotInfo";
import Activity from "./Activity";

const CalendarContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

interface IActivityDates {
  startDate: Date;
  endDate: Date;
}

export interface IActivity {
  name: string;
  cnt: number;
  startDate: Date;
  endDate: Date;
}

const ActivityContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 75%;
  margin-bottom: 75px;
`;

const ActivityTitle = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  align-self: flex-start;
`;

const DiaryCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selMonth, setSelMonth] = useState<Date>(new Date());
  const [diaryDates, setDiaryDates] = useState<Array<string>>([]);
  const [activityDates, setActivityDates] = useState<Array<IActivityDates>>([]);
  const [activities, setActivities] = useState<Array<IActivity>>([]);
  const router = useRouter();
  const handleChange = useCallback(
    (item: Date) => {
      const dayString = format(item, "yyyy-MM-dd");

      if (diaryDates.includes(dayString)) {
        router.push(`/diary/${dayString}`);
      } else {
        router.push(
          {
            pathname: `/diary/write`,
            query: { date: dayString },
          },
          `/diary/write`
        );
      }
      setDate(item);
    },
    [diaryDates]
  );

  const customDayContent = useCallback(
    (day: Date) => {
      let diaryDot: any = null;
      const dayString = format(day, "yyyy-MM-dd");
      if (diaryDates.includes(dayString)) {
        diaryDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "orange",
              position: "absolute",
              top: 2,
              right: 10,
            }}
          />
        );
      }

      let activityDot: any = null;
      for (let i = 0; i < activityDates.length; i++) {
        if (
          activityDates[i].startDate <= day &&
          day <= activityDates[i].endDate
        ) {
          activityDot = (
            <div
              style={{
                height: "5px",
                width: "5px",
                borderRadius: "100%",
                background: "skyblue",
                position: "absolute",
                top: 2,
                right: 2,
              }}
            />
          );

          break;
        }
      }
      return (
        <div>
          {diaryDot}
          {activityDot}
          <span>{format(day, "d")}</span>
        </div>
      );
    },
    [diaryDates, activityDates]
  );

  useEffect(() => {
    getMyAllDiary(
      null,
      ({ data }: any) => {
        setDiaryDates(data.map((day: any) => day.date));
      },
      (error: Error) => console.log(error)
    );

    getMyAllActivityReservation(
      null,
      ({ data }: any) => {
        setActivities(
          data.map((reservation: any) => ({
            name: reservation.activity.name,
            cnt: reservation.cnt,
            startDate: new Date(reservation.startDate.join("-")),
            endDate: new Date(reservation.endDate.join("-")),
          }))
        );
        setActivityDates(
          data.map((day: any) => ({
            startDate: new Date(day.startDate.join("-")),
            endDate: new Date(day.endDate.join("-")),
          }))
        );
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const handleShownDateChange = useCallback((item: Date) => {
    setSelMonth(item);
  }, []);

  return (
    <CalendarContainer>
      <CalendarDotInfo />
      <Calendar
        onChange={(item) => handleChange(item)}
        onShownDateChange={(item) => handleShownDateChange(item)}
        locale={dateFnsLocales["ko"]}
        date={date}
        color={theme.palette.primary.main}
        dayContentRenderer={customDayContent}
      />
      <ActivityContainer>
        <ActivityTitle>{selMonth.getMonth() + 1}월 나의 일정 🚩</ActivityTitle>
        {activities
          .filter(
            (activity) =>
              activity.startDate.getMonth() <= selMonth.getMonth() &&
              selMonth.getMonth() <= activity.endDate.getMonth()
          )
          .map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
      </ActivityContainer>
    </CalendarContainer>
  );
};

export default DiaryCalendar;
