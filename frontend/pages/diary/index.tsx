import React from "react";
import Seo from "../../components/Seo";
import Link from "next/link";
const Diary = () => {
  return (
    <>
      <Seo title="Diary" />
      <div>Diary</div>
      <Link href="/diary/profile">
        <a>내정보</a>
      </Link>
    </>
  );
};

export default Diary;
