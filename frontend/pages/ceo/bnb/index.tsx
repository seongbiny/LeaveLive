import React, { useEffect, useState } from "react";
import { WideButton } from "../../../components/WideButton";
import { getMyBnbList } from "../../../api/ceo";
import Link from "next/link";
import BnbList from "../../../components/ceo/BnbList";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Basic";
import { useRouter } from "next/router";
import Header from "../../../components/Header";

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
  width: 100%;
`;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 75px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 75px;
  width: 80%;
  transform: translate(-50%, 0);
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
    <>
      <Container>
        <Header title="숙소 관리" hide={true} />
        <Wrapper>
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
        </Wrapper>
        {/* <Link href={`/ceo/bnb/create`} passHref> */}
        <ButtonWrapper>
          <WideButton onClick={() => {}} text="새 숙소 등록하기" />
        </ButtonWrapper>
        {/* </Link> */}
      </Container>
    </>
  );
};

export default MyBnbList;
