import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import * as dateFnsLocales from "date-fns/locale";
import { format, isWeekend } from "date-fns";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import theme from "../../styles/Theme";
import { getMyAllDiary } from "../../api/diary";
import { getMyAllActivityReservation } from "../../api/reservation";
import { useRouter } from "next/router";

const CalendarContainer = styled.div`
  ${flexCenter}
  width: 100%;
  margin-top: 1rem;
`;

const DiaryCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();
  const handleChange = useCallback((item: Date) => {
    // console.log(format(item, "yyyy-MM-dd"));
    // router.push(
    //   {
    //     pathname: `/diary/write`,
    //     query: { date: format(item, "yyyy-MM-dd") },
    //   },
    //   `/diary/write`
    // );
    router.push(`/diary/${format(item, "yyyy-MM-dd")}`);
    setDate(item);
  }, []);

  const handleClick = useCallback((date: Date, activityDot: any) => {
    if (activityDot === null) router.push(`/diary/write`);
    else router.push(`/diary/${format(date, "yyyy-MM-dd")}`);
  }, []);

  const customDayContent = useCallback((day: Date) => {
    let extraDot: any = null;
    if (isWeekend(day)) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "orange",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
      );
    }
    return (
      <div>
        {/* <div onClick={() => handleClick(day, extraDot)}> */}
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }, []);

  useEffect(() => {
    getMyAllDiary(
      null,
      (response: any) => {
        console.log(response);
      },
      (error: Error) => console.log(error)
    );

    getMyAllActivityReservation(
      null,
      (response: any) => {
        console.log(response);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <CalendarContainer>
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
