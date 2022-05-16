import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { activityDetail } from "../../../../api/activity";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { BACKEND_IMAGE_URL } from "../../../../api";
import Image from "next/image";
import Map from "../../../../components/ceo/BnbMap";
import { flexCenter } from "../../../../styles/Basic";
import Header from "../../../../components/Header";
interface IDetail {
  cnt: number;
  contents: string;
  id: number;
  loc: string;
  name: string;
  picContents: string;
  picPath: string;
  price: number;
  userId: string;
}

const Container = styled.div`
  // ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-bottom: 75px;
  line-height: 2.2rem;
`;

const BnbTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  padding-right: 70vw;
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
  width: 80%;
`;
const ActivityDetail = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<IDetail>({
    cnt: 0,
    contents: "",
    id: 0,
    loc: "",
    name: "",
    picContents: "",
    picPath: "",
    price: 0,
    userId: "",
  });
  
  // console.log(detail.picPath.split(","))
  useEffect(()=>{
    const id = router.query.id;
    {id !== undefined &&
      activityDetail(
        id,
        ({ data }: any) => {
          const value = {
            ...data,
          };
          if (!value.picPath) value.picPath = "/default.png";
          setDetail(value);
          console.log(value);
        },
        (error: Error) => console.log(error)
      )
    }
    console.log(detail.picPath.split(","))
  },[router])

  return (
    <Container>
      <div style={{ position: "relative", width: "100%" }}>
        <Header title="상세보기" hide={false} />
        <Carousel
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
        >
          {detail.picPath?.split(",").map((path, index) => (
            <div key={index}>
              <img
                src={
                  path === "/default.png"
                    ? path
                    : `${BACKEND_IMAGE_URL}/${path}`
                }
                width={412}
                height={250}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <BnbTitle>{detail.name}</BnbTitle>
      <img src={`${BACKEND_IMAGE_URL}/${detail.picContents}`} width="90%"  />
      <div>
        <div>위치 {detail.loc}</div>
        <Map
          address={detail.loc}
          style={{ margin: "1rem 0"}}
        />
      </div>
      <div onClick={()=>{router.push(`/reservation/activity/${detail.id}`)}}>예약하기</div>
    </Container>
  )
};

export default ActivityDetail;
