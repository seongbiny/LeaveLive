import React, { useEffect, useState, useCallback } from "react";
import { getMyBnbDetail, deleteMyBnb } from "../../../api/ceo";
import { useRouter } from "next/router";
import styled from "styled-components";
import DetailNav from "../../../components/ceo/DetailNav";
import Carousel from "../../../components/Carousel";
import BackButton from "../../../components/BackButton";
import { flexCenter } from "../../../styles/Basic";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import Map from "../../../components/ceo/BnbMap";
import Button from "@mui/material/Button";

export interface IDetail {
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
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-bottom: 75px;
  line-height: 2.2rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 2%;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  width: 80%;
`;

const BnbTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
`;

const BnbContent = styled.div`
  padding-bottom: 1rem;
`;

const BnbHeading = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.6rem 0;
`;

const AdditionalInfo = styled.div`
  ${flexCenter}
  align-items: flex-start;
`;

const BnbConditionWrapper = styled.div`
  ${flexCenter}
  justify-content: flex-start;
  padding-bottom: 0.5rem;

  span {
    margin-left: 0.2rem;
  }
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
        const value = {
          ...data,
        };

        if (!value.picPath) value.picPath = "/default.png";
        setDetail(value);
      },
      (error: Error) => console.log(error)
    );
  }, [router]);

  const handleDelete = useCallback(() => {
    deleteMyBnb(
      router.query.id,
      (response: any) => {
        if (confirm("숙소를 삭제할까요?")) {
          alert("숙소를 성공적으로 삭제했어요.");
          router.push(`/ceo/bnb`);
        }
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <Container>
      <div style={{ position: "relative", width: "100%" }}>
        <ButtonWrapper>
          <BackButton />
        </ButtonWrapper>
        <Carousel picPath={detail.picPath} />
      </div>
      <ContentContainer>
        <BnbTitle>{detail.name}</BnbTitle>
        <BnbContent>
          {detail?.contents.split("\n").map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </BnbContent>
        <div>
          <BnbHeading>위치</BnbHeading>
          {detail.loc}
          <Map
            // longitude={126.9726223}
            // latitude={37.5866076}
            address={detail.loc}
            style={{ margin: "1rem 0" }}
          />
        </div>
        <AdditionalInfo>
          <div style={{ flex: 1 }}>
            <BnbHeading>편의시설</BnbHeading>
            <div>
              <BnbConditionWrapper>
                <LocalFloristRoundedIcon />
                <span>정원 {detail.garden === "T" ? "있음" : "없음"}</span>
              </BnbConditionWrapper>
              <BnbConditionWrapper>
                <SoupKitchenRoundedIcon />{" "}
                <span>취사 {detail.cooking === "T" ? "가능" : "불가능"}</span>
              </BnbConditionWrapper>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <BnbHeading>최대 {detail.cnt}명</BnbHeading>
            까지 입실할 수 있어요.
          </div>
        </AdditionalInfo>
      </ContentContainer>
      <Button
        variant="text"
        color="error"
        style={{ alignSelf: "center", width: "80%", margin: "1rem 0" }}
        onClick={handleDelete}
      >
        숙소 삭제하기
      </Button>
      <DetailNav
        price={detail.price}
        text="수정하기"
        onClick={() =>
          router.push(
            {
              pathname: `/ceo/bnb/update`,
              query: { id: router.query.id },
            },
            `/ceo/bnb/update`
          )
        }
      ></DetailNav>
    </Container>
  );
};

export default BnbDetail;
