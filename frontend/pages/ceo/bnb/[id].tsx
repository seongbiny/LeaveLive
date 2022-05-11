import React, { useEffect, useState } from "react";
import { getMyBnbDetail } from "../../../api/ceo";
import { useRouter } from "next/router";
import styled from "styled-components";
import DetailNav from "../../../components/ceo/DetailNav";

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

const Container = styled.div`
  width: 100%;
`;
const BnbDetail = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<IDetail>({
    cnt: 0,
    contents: "",
    cooking: "F",
    garden: "F",
    id: 0,
    loc: "",
    name: "",
    picPath: "",
    price: 0,
    userId: "",
  });
  useEffect(() => {
    const id = router.query.id;
    getMyBnbDetail(
      id,
      ({ data }: any) => {
        setDetail(data);
      },
      (error: Error) => console.log(error)
    );
  }, [router]);

  return (
    <Container>
      <div>뒤로가기 버튼, carousel</div>
      <div>
        <div>제목</div>
        <div>
          설명
          {detail?.contents.split("\n").map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </div>
        <div>위치 여기에 지도{detail.loc}</div>
        <div>편의시설 표기</div>
        <div>최대 몇명?</div>
        <DetailNav price={detail.price}></DetailNav>
      </div>
    </Container>
  );
};

export default BnbDetail;
