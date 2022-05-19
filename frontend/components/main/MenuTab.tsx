import type { NextPage } from "next";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { flexCenter } from "../../styles/Basic";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: grid;
  text-align: center;
  font-size: 0.8rem;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: 0 0.5rem; */
  margin-top: 1vh;
  margin-bottom: 4vh;
  width: 100%;
`;

const MenuBackground = styled.div`
  ${flexCenter}
  background-color: #defff2;
  width: 65px;
  height: 65px;
  border-radius: 14px;

  &:hover {
    background-color: #00cf95;
    transition: 0.3s ease;

    & > svg {
      color: white;
    }
  }
`;

const MenuTab: NextPage = () => {
  const router = useRouter();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const tag = ["CE7", "HP8", "CS2", "BK9"];

  // 현재 위치 경도 위도 얻는 함수
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    // console.log(latitude, longitude)
  }, []);

  const handleClick = (para: string): void => {
    router.push(
      {
        pathname: "/main/map",
        query: { tag: para, latitude: latitude, longitude: longitude },
      },
      "/main/map"
    );
  };

  return (
    <>
      <div style={{ margin: "3vh 0", fontWeight: "bold" }}>
        🏥 주변 편의 시설
      </div>
      <Menu>
        <Container onClick={() => handleClick(tag[0])}>
          <MenuBackground>
            <LocalCafeRoundedIcon color="primary" />
          </MenuBackground>
          <div style={{ paddingTop: "1vh" }}>카페</div>
        </Container>
        <Container onClick={() => handleClick(tag[1])}>
          <MenuBackground>
            <LocalHospitalRoundedIcon color="primary" />
          </MenuBackground>
          <div style={{ paddingTop: "1vh" }}>병원</div>
        </Container>
        <Container onClick={() => handleClick(tag[2])}>
          <MenuBackground>
            <LocalGroceryStoreRoundedIcon color="primary" />
          </MenuBackground>
          <div style={{ paddingTop: "1vh" }}>편의점</div>
        </Container>
        <Container onClick={() => handleClick(tag[3])}>
          <MenuBackground>
            <AttachMoneyRoundedIcon color="primary" />
          </MenuBackground>
          <div style={{ paddingTop: "1vh" }}>은행</div>
        </Container>
      </Menu>
    </>
  );
};

export default MenuTab;
