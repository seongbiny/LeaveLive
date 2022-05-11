import React, { useEffect, useState } from "react";
import { WideButton } from "../../../components/WideButton";
import { getMyBnbList } from "../../../api/ceo";
import Link from "next/link";
import BnbList from "../../../components/ceo/BnbList";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Basic";
import { useRouter } from "next/router";

interface IBnbList {
  id: number;
  loc: string;
  price: number;
  picPath: string;
  name: string;
  contents: string;
  cooking: "T" | "F";
  garden: "T" | "F";
  cnt: number;
}

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  flex-direction: column;
`;

const MyBnbList = () => {
  useEffect(() => {
    getMyBnbList(
      null,
      ({ data }: any) => {
        setBnbList(data);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const [bnbList, setBnbList] = useState<Array<IBnbList>>();
  const router = useRouter();

  return (
    <Container>
      내가 등록한 숙소 목록
      {bnbList?.map((bnb) => (
        <BnbList
          key={bnb.id}
          picPath={bnb.picPath.split(",")[0]}
          name={bnb.name}
          price={bnb.price}
          onClick={() =>
            router.push(
              {
                pathname: `/ceo/bnb/${bnb.id}`,
                query: { id: bnb.id },
              },
              `/ceo/bnb/${bnb.id}`
            )
          }
        />
      ))}
      {/* <Link href={`/ceo/bnb/create`} passHref> */}
      <WideButton onClick={() => {}} text="새 숙소 등록하기" />
      {/* </Link> */}
    </Container>
  );
};

export default MyBnbList;
