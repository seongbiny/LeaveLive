import React, { useEffect, useState } from "react";
import { getMyBnbDetail } from "../../../api/ceo";
import { useRouter } from "next/router";
import styled from "styled-components";
import DetailNav from "../../../components/ceo/DetailNav";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BACKEND_IMAGE_URL } from "../../../api";
import Image from "next/image";
import BackButton from "../../../components/BackButton";
import { flexCenter } from "../../../styles/Basic";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import Map from "../../../components/ceo/BnbMap";

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
  ${flexCenter}
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 2%;
  z-index: 2;
`;

const ContentContainer = styled.div`
  width: 80%;
`;

const BnbTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1.5rem 0;
`;

const BnbContent = styled.div`
  padding-bottom: 1rem;
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
      <div style={{ position: "relative" }}>
        <ButtonWrapper>
          <BackButton />
        </ButtonWrapper>
        <Carousel
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          {detail.picPath.split(",").map((path, index) => (
            <div key={index}>
              <Image
                src={`${BACKEND_IMAGE_URL}/${path}`}
                width={412}
                height={250}
              />
            </div>
          ))}
        </Carousel>
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
          위치{detail.loc}지도있어야함
          <Map
            longitude={126.9726223}
            latitude={37.5866076}
            address={detail.loc}
          />
        </div>
        <div>
          편의시설
          <LocalFloristRoundedIcon />
          정원 {detail.garden === "T" ? "있음" : "없음"}
          <SoupKitchenRoundedIcon /> 취사{" "}
          {detail.cooking === "T" ? "가능" : "불가능"}
        </div>
        <div>최대 {detail.cnt}명</div>
      </ContentContainer>
      <DetailNav price={detail.price}></DetailNav>
    </Container>
  );
};

export default BnbDetail;
