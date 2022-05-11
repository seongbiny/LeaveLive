import React, { useEffect, useState } from "react";
import { getMyBnbDetail } from "../../../api/ceo";
import { useRouter } from "next/router";

interface IDetail {
  cnt: number;
  contents: string;
  cooking: string;
  garden: string;
  id: number;
  loc: string;
  name: string;
  picPath: string;
  price: number;
  userId: string;
}
const BnbDetail = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<IDetail>();
  useEffect(() => {
    console.log(router);
    const id = router.query.id;
    getMyBnbDetail(
      id,
      ({ data }: any) => {
        setDetail(data);
        console.log(data);
      },
      (error: Error) => console.log(error)
    );
  }, [router]);
  return (
    <div>
      {detail?.contents.split("\n").map((line, index) => {
        return (
          <span key={index}>
            {line}
            <br />
          </span>
        );
      })}
    </div>
  );
};

export default BnbDetail;
