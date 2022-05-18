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
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Button } from "@mui/material";
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 75px;
  line-height: 2.2rem;
  margin-bottom: 13vh;
`;

const ContentContainer = styled.div`
  width: 90%;
  justify-content: center;
  margin: auto;
  padding-top: 3vh;
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
  
  const [path, setPath] = useState([]);

  useEffect(()=>{
    const id = router.query.id;
    activityDetail(
      id,
      ({ data }: any) => {console.log(data), setDetail(data), setPath(data.picPath.split(","))},
      (error: Error) => console.log(error)
    )
    console.log(detail)
  },[router])

  return (
    detail.id !== 0 &&
      <Container>
        <div style={{ position: "relative", width: "100%" }}>
          <Header title="상세보기" hide={false} />
          <Carousel
            infiniteLoop
            showThumbs={false}
          >
            {path.map((pic, idx)=>(
              <div key={idx}>
                <img 
                  src={`${BACKEND_IMAGE_URL}/${pic}`}
                  width={350} height={300}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <ContentContainer>
          <div style={{fontSize:'1.5rem', fontWeight:'bold', paddingBottom: '3vh'}}>{detail.name}</div>
          <div>
            <AddLocationIcon />
            <div style={{fontSize: '1rem', display: 'inline'}}>{detail.loc}</div>
            <Map
              address={detail.loc}
              style={{ margin: "1rem 0"}}
            />
          </div>
          <img src={`${BACKEND_IMAGE_URL}/${detail.picContents}`} width="100%" />
        </ContentContainer>
        <Bottom onClick={()=>{router.push(`/reservation/activity/${detail.id}`)}}>
          <div style={{marginRight:'20vw', fontWeight:'bold', fontSize:'1.2rem'}}>{detail.price}원 / 인</div>
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
export default ActivityDetail;
