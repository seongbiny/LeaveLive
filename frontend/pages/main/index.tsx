import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import styled from "styled-components";
import MenuTab from "../../components/main/MenuTab";
import { getUserInfo } from "../../api/user";
import { getBnbReservation } from "../../api/bnb";
import { getActivityReservation } from "../../api/activity";
import MainSlider from "../../components/main/MainSlider";
import { flexCenter } from "../../styles/Basic";

const Main = () => {
  const [nickName, setNickName] = useState("");
  const [act, setAct] = useState<Array<Object>>([]);
  const [bnb, setBnb] = useState<Array<Object>>([]);
  const [actTom, setActTom] = useState<Array<Object>>([]);
  const [bnbTom, setBnbTom] = useState<Array<Object>>([]);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  };

  const getTommorow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + (Number(date.getDate()) + Number(1))).slice(-2);
    return year + "-" + month + "-" + day;
  };

  useEffect(() => {
    const day = getToday();
    const tom = getTommorow();
    getUserInfo(
      null,
      ({ data }: any) => {
        setNickName(data.nickname);
      },
      (error: Error) => console.log(error)
    );
    getBnbReservation(
      day,
      ({ data }: any) => {
        setBnb(data);
      },
      (error: Error) => console.log(error)
    );
    getActivityReservation(
      day,
      ({ data }: any) => {
        setAct(data);
      },
      (error: Error) => console.log(error)
    );
    getBnbReservation(
      tom,
      ({ data }: any) => {
        setBnbTom(data);
      },
      (error: Error) => console.log(error)
    );
    getActivityReservation(
      tom,
      ({ data }: any) => {
        setActTom(data);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <Container style={{ marginBottom: "13vh" }}>
      <Seo title="Main" />
      <Box>
        <Text>
          <span
            style={{ color: "#00cf95", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {nickName}
          </span>{" "}
          님, <br /> 즐거운 여행 되고 계신가요?
        </Text>
      </Box>
      <ContentsContainer>
        <MenuTab />
        <TitleText>⛳ 오늘 나의 일정</TitleText>
        {act.length !== 0 || bnb.length !== 0 ? (
          <MainSlider act={act} bnb={bnb} />
        ) : (
          <StyledError>일정이 없습니다.</StyledError>
        )}
        <TitleText>🚀 내일 나의 일정</TitleText>
        {actTom.length !== 0 || bnbTom.length !== 0 ? (
          <MainSlider act={actTom} bnb={bnbTom} />
        ) : (
          <StyledError>일정이 없습니다.</StyledError>
        )}
      </ContentsContainer>
    </Container>
  );
};

const StyledError = styled.div`
  width: 85%;
  height: 25vh;
  color: gray;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  line-height: 25vh;
  margin-top: 1vh;
  margin-bottom: 3vh;
  border: 1px dashed;

  font-size: 0.9rem;
`;

const Box = styled.div`
  position: relative;
  background-image: url("/main-background.jpg");
  background-position: center center;
  background-size: cover;
  background-color: black;
  width: 100%;
  height: 200px;
  border-radius: 0 0 24px 24px;

  &:before {
    content: "";
    opacity: 55%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    border-radius: 0 0 24px 24px;
  }
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 50%;
  left: 10%;
  font-size: 1.1rem;
  line-height: 2rem;
`;

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const ContentsContainer = styled.div`
  ${flexCenter}
  align-items: flex-start;
  width: 80%;
  flex-direction: column;
  margin-top: 1vh;
`;

const TitleText = styled.div`
  font-weight: bold;
  margin: 2vh 0;
  font-size: 1.2rem;
`;
export default Main;
