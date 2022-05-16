import React from "react";
import { useRouter } from "next/router";

const DiaryContents = () => {
  const router = useRouter();
  const date = router.query.date;

  return <div>{date}</div>;
};

export default DiaryContents;
