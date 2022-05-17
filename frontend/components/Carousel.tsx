import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BACKEND_IMAGE_URL } from "../api";
import Image from "next/image";

interface IPropTypes {
  picPath: string;
}

const MyCarousel = ({ picPath }: IPropTypes) => {
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}
    >
      {picPath?.split(",").map((path, index) => (
        <div key={index}>
          <Image
            src={
              path === "/default.png" ? path : `${BACKEND_IMAGE_URL}/${path}`
            }
            width={412}
            height={250}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
