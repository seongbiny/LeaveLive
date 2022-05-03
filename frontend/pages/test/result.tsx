import React from "react";
import { useRouter } from 'next/router'

const Result = () => {
  const router = useRouter();
  return (
    <>
      <div>
        {router.query.region}
      </div>
    </>
  )
};

export default Result;
