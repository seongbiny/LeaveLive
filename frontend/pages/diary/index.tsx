import React from "react";
import Seo from "../../components/Seo";
import Header from "../../components/Header";
import Profile from "../../components/diary/profile";
import Calendar from "../../components/diary/Calendar";

const Diary = () => {
  return (
    <>
      <Seo title="Diary" />
      <Header title="여행 다이어리" hide={true} />
      <Profile />
      <Calendar />
    </>
  );
};

export default Diary;
