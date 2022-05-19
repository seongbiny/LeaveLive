import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  activityDetail,
  likeActivityList,
  likeActivity,
  unlikeActivity,
} from "../../../../api/activity";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { BACKEND_IMAGE_URL } from "../../../../api";
import Map from "../../../../components/ceo/BnbMap";
import { flexCenter } from "../../../../styles/Basic";
import Header from "../../../../components/Header";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Button } from "@mui/material";
import MyCarousel from "../../../../components/Carousel";
import DetailNav from "../../../../components/ceo/DetailNav";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Seo from "../../../../components/Seo";

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

const Text = styled.div`
  z-index: 100;
  position: absolute;
  top: 30%;
  left: 85%;
`;

const ContentContainer = styled.div`
  width: 90%;
  justify-content: center;
  margin: auto;
  padding-top: 3vh;
`;

const ActivityDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const [like, setLike] = useState(false);
  const [list, setList] = useState<any>([]);
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

  const likeAxios = () => {
    likeActivity(
      id,
      (response: any) => console.log(response),
      (error: Error) => console.log(error)
    );
  };

  const unlikeAxios = () => {
    unlikeActivity(
      id,
      (response: any) => console.log(response),
      (error: Error) => console.log(error)
    );
  };

  useEffect(() => {
    activityDetail(
      id,
      ({ data }: any) => {
        setDetail(data);
      },
      (error: Error) => console.log(error)
    );
    likeActivityList(
      null,
      ({ data }: any) => {
        setList(data);
      },
      (error: Error) => console.log(error)
    );
  }, [router]);

  useEffect(() => {
    console.log(list);
    list.map((item: any) => {
      if (Number(item.activity.id) === Number(id)) {
        setLike(true);
      }
    });
  }, [list]);

  return (
    detail.id !== 0 && (
      <Container>
        <Seo title="상세보기" />
        <div style={{ position: "relative", width: "100%" }}>
          <Header title="상세보기" hide={false} />
          <Text>
            {like === false ? (
              <FavoriteBorderIcon
                fontSize="medium"
                sx={{ color: "#FF385C" }}
                onClick={() => {
                  setLike(!like);
                  likeAxios();
                }}
              />
            ) : (
              <FavoriteIcon
                fontSize="medium"
                sx={{ color: "#FF385C" }}
                onClick={() => {
                  setLike(!like);
                  unlikeAxios();
                }}
              />
            )}
          </Text>
          <MyCarousel picPath={detail.picPath} />
        </div>
        <ContentContainer>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              paddingBottom: "3vh",
            }}
          >
            {detail.name}
          </div>
          <div>
            <AddLocationIcon />
            <div style={{ fontSize: "1rem", display: "inline" }}>
              {detail.loc}
            </div>
            <Map address={detail.loc} style={{ margin: "1rem 0" }} />
          </div>
          <img
            src={`${BACKEND_IMAGE_URL}/${detail.picContents}`}
            width="100%"
          />
        </ContentContainer>
        <DetailNav
          price={detail.price}
          text="예약하기"
          onClick={() => {
            router.push(`/reservation/activity/${detail.id}`);
          }}
        />
      </Container>
    )
  );
};

export default ActivityDetail;
