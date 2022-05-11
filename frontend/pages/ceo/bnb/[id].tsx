import React, { useEffect } from "react";
import { getMyBnbDetail } from "../../../api/ceo";
import { useRouter } from "next/router";

const BnbDetail = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    const id = router.query.id;
    getMyBnbDetail(
      id,
      ({ data }: any) => {
        console.log(data);
      },
      (error: Error) => console.log(error)
    );
  }, [router]);
  return <div>테스트</div>;
};

export default BnbDetail;
