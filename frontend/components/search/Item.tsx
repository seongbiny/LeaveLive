import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BACKEND_IMAGE_URL } from "../../api";
import { useRouter } from "next/router";

const Box = styled.div`
  position: relative;
  display: grid;
  margin-bottom: 3vh;
`;
const Hover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Item = ({ list, url }: any) => {
  const id = list[0].id;
  const picPath: Array<String> = list[0].picPath.split(",");
  const name = list[0].name;
  const router = useRouter();
  const region = router.query.region;

  return (
    <Box>
      <Carousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {picPath.map((pic, idx) => (
          <div key={idx} style={{ marginLeft: "5vw", marginRight: "5vw" }}>
            <img
              src={`${BACKEND_IMAGE_URL}/${pic}`}
              width={350}
              height={200}
              style={{ borderRadius: "10px" }}
            />
          </div>
        ))}
      </Carousel>
      <Hover
        onClick={() => {
          router.push(`/reservation/${region}/${url}/${id}`);
        }}
        style={{
          marginLeft: "5vw",
          fontSize: "1rem",
          paddingTop: "1.5vh",
          fontWeight: "bold",
        }}
      >
        {name}
      </Hover>
    </Box>
  );
};
export default Item;
