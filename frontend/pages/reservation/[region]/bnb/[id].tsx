import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { BACKEND_IMAGE_URL } from "../../../../api";
import { bnbDetail } from "../../../../api/bnb";
import Map from "../../../../components/ceo/BnbMap";
import { flexCenter } from "../../../../styles/Basic";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import Header from "../../../../components/Header";
import { Button } from "@mui/material";
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
  // ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 75px;
  line-height: 2.2rem;
  margin-bottom: 13vh;
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

const ContentContainer = styled.div`
  width: 90%;
  justify-content: center;
  margin: auto;
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
  const [path, setPath] = useState([]);

  useEffect(()=>{
    const id = router.query.id;
    bnbDetail(
      id,
      ({ data }: any) => {console.log(data), setDetail(data), setPath(data.picPath.split(","))},
      (error: Error) => console.log(error)
    )
    console.log(detail)
  },[router])

  return(
    detail.id !== 0 &&
      <Container>
        <div style={{ position: "relative", width: "100%" }}>
          <Header title="상세보기" hide={false} />
          <Carousel infiniteLoop showThumbs={false}>
            {path.map((pic, idx)=>(
              <div key={idx}>
                <img
                  src={`${BACKEND_IMAGE_URL}/${pic}`}
                  width={350} height={250} 
                  style={{borderRadius: '10px'}}
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
            <BnbHeading>위치</BnbHeading>
            {detail.loc}
            <Map
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
        <Bottom onClick={()=>{router.push(`/reservation/bnb/${detail.id}`)}}>
          <div style={{marginRight:'20vw', fontWeight:'bold', fontSize:'1.2rem'}}>{detail.price}원 / 박</div>
          <div>
            <Button variant="contained" >예약하기</Button>
          </div>
        </Bottom>
      </Container>
  )
};
const Bottom = styled.div`
  width: 100%;
  height: 10vh;
  // border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d3d3d3;
  position: fixed;
  margin-top: 90vh;
  z-index: 100;
`;
export default BnbDetail;
