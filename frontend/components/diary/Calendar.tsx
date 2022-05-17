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

const DiaryCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [diaryDates, setDiaryDates] = useState<Array<string>>([]);
  const [activityDates, setActivityDates] = useState<Array<IActivityDates>>([]);
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

  return (
    <CalendarContainer>
      <CalendarDotInfo />
      <Calendar
        onChange={(item) => handleChange(item)}
        locale={dateFnsLocales["ko"]}
        date={date}
        color={theme.palette.primary.main}
        dayContentRenderer={customDayContent}
      />
    </CalendarContainer>
  );
};

export default DiaryCalendar;
