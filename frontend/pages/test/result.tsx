import React from "react";
import { useRouter } from 'next/router'

const Result = () => {
  const router = useRouter();
  return (
    <>
      <div>
        {router.query.region}
      </div>
      <button>여행가기</button>
    </>
  )
};

export default Result;
