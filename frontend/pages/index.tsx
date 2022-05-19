import type { NextPage } from "next";
import Seo from "../components/Seo";
import styled from "styled-components";
import Link from "next/link";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { flexCenter } from "../styles/Basic";

const Main = styled.div`
  font-family: "YoonSJH";
  padding-top: 12%;
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 22vh;
`;
const Text = styled.div`
  display: grid;
  margin-bottom: 8vh;
  font-size: 2rem;
`;

const StyledText = styled.div`
  font-size: 1.6rem;
  line-height: 3.4rem;
  &:hover {
    text-decoration: none;
    display: inline;
    box-shadow: 0 -6px rgba(0, 207, 149, 0.3) inset;
  }
  cursor: pointer;
`;

const Home: NextPage = () => {
  return (
    <Container style={{ height: "100%" }}>
      <Main>
        <Seo title="Home" />
        <Text>
          <div> " 낯선 장소다..</div>
          <div>기억이 하나도 안나..</div>
          <div>나는 누구였지…? "</div>
        </Text>
        <Link
          href={{ pathname: "/login", query: { type: "user" } }}
          as={`/login`}
        >
          <a
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <StyledText>✈️ 여행을 가려고 했다.</StyledText>
          </a>
        </Link>

        <Link
          href={{ pathname: "/login", query: { type: "ceo" } }}
          as={`/login`}
        >
          <a style={{ textDecoration: "none", color: "black" }}>
            <StyledText>🏡 집을 가지고 있다.</StyledText>
          </a>
        </Link>
      </Main>
      <Logo>
        <AirplanemodeActiveIcon /> Leave, live
      </Logo>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  ${flexCenter}
  width: 100%;
  text-align: center;
  color: #00cf95;

  & > svg {
    margin-right: 1%;
  }
`;

export default Home;
