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
import { getBnbList } from "../../api/bnb";
import { getMyAllActivityReservation } from "../../api/reservation";
import { useRouter } from "next/router";
import CalendarDotInfo from "../../components/diary/CalendarDotInfo";
import Schedule from "./Schedule";

const CalendarContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

interface IDates {
  startDate: Date;
  endDate: Date;
}

export interface IActivity {
  name: string;
  cnt: number;
  startDate: Date;
  endDate: Date;
}

export interface ISchedule {
  name: string;
  cnt: number;
  startDate: Date;
  endDate: Date;
  id: number;
  type: "BNB" | "ACTIVITY";
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

const DotContainer = styled.div`
  position: absolute;
  width: 100%;
  right: 6px;
  ${flexCenter}
  justify-content: flex-end;

  & > div:not(:last-of-type) {
    margin-right: 3px;
  }
`;

const DiaryCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selMonth, setSelMonth] = useState<Date>(new Date());
  const [diaryDates, setDiaryDates] = useState<Array<string>>([]);
  const [activityDates, setActivityDates] = useState<Array<IDates>>([]);
  const [bnbDates, setBnbDates] = useState<Array<IDates>>([]);
  const [activities, setActivities] = useState<Array<ISchedule>>([]);
  const [bnbs, setBnbs] = useState<Array<ISchedule>>([]);
  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
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
            }}
          />
        );
      }

      let bnbDot: any = null;
      for (let i = 0; i < bnbDates.length; i++) {
        if (bnbDates[i].startDate <= day && day <= bnbDates[i].endDate) {
          bnbDot = (
            <div
              style={{
                height: "5px",
                width: "5px",
                borderRadius: "100%",
                background: "hotpink",
              }}
            />
          );

          break;
        }
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
              }}
            />
          );

          break;
        }
      }

      return (
        <div>
          <DotContainer>
            {diaryDot}
            {bnbDot}
            {activityDot}
          </DotContainer>
          <span>{format(day, "d")}</span>
        </div>
      );
    },
    [diaryDates, bnbDates, activityDates]
  );

  useEffect(() => {
    getMyAllDiary(
      null,
      ({ data }: any) => {
        setDiaryDates(data.map((day: any) => day.date));
      },
      (error: Error) => console.log(error)
    );

    getBnbList(
      null,
      ({ data }: any) => {
        const bnbs = data.map((reservation: any) => ({
          type: "BNB",
          id: reservation.accommodationArticle.id,
          name: reservation.accommodationArticle.name,
          cnt: reservation.cnt,
          startDate: new Date(reservation.startDate.join("-")),
          endDate: new Date(reservation.endDate.join("-")),
        }));

        setBnbs(bnbs);
        setBnbDates(
          data.map((reservation: any) => ({
            startDate: new Date(reservation.startDate.join("-")),
            endDate: new Date(reservation.endDate.join("-")),
          }))
        );
      },
      (error: Error) => console.log(error)
    );

    getMyAllActivityReservation(
      null,
      ({ data }: any) => {
        const activities = data.map((reservation: any) => ({
          type: "ACTIVITY",
          id: reservation.activity.id,
          name: reservation.activity.name,
          cnt: reservation.cnt,
          startDate: new Date(reservation.startDate.join("-")),
          endDate: new Date(reservation.endDate.join("-")),
        }));
        setActivities(activities);

        setActivityDates(
          data.map((reservation: any) => ({
            startDate: new Date(reservation.startDate.join("-")),
            endDate: new Date(reservation.endDate.join("-")),
          }))
        );
      },
      (error: Error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    if (bnbs.length !== 0 && activities.length !== 0)
      setSchedules([...bnbs, ...activities]);
  }, [bnbs, activities]);

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
        {schedules
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          .filter(
            (schedule) =>
              schedule.startDate.getMonth() <= selMonth.getMonth() &&
              selMonth.getMonth() <= schedule.endDate.getMonth()
          )
          .map((activity, index) => (
            <Schedule key={index} schedule={activity} />
          ))}
      </ActivityContainer>
    </CalendarContainer>
  );
};

export default DiaryCalendar;
