import type { NextPage } from "next";
import Seo from "../components/Seo";
import styled from "styled-components";
import Link from "next/link";

const Main = styled.div`
  border: 1px solid;
  height: 100%;
  padding-top: 50%;
  text-align: center;
  font-size: 25px;
`;
const Text = styled.div`
  display: grid;
  margin-bottom: 5vh;
`;
const StyledA = styled.a`
  &:hover {
    text-decoration: none;
    display: inline;
    box-shadow: 0 -6px rgba(75, 112, 253, 0.3) inset;
  }
  cursor: pointer;
`;

const Home: NextPage = () => {
  return (
    <Main>
      <Seo title="Home" />
      <Text>
        <div>낯선 천장이다..</div>
        <div>기억이 하나도 안나..</div>
        <div>나는 누구였지..?</div>
      </Text>
      <Link
        href={{ pathname: "/login", query: { type: "user" } }}
        as={`/login`}
      >
        <StyledA>
          <div>여행을 가려고 했다.</div>
        </StyledA>
      </Link>

      <Link href={{ pathname: "/login", query: { type: "ceo" } }} as={`/login`}>
        <StyledA>
          <div>집을 가지고 있다.</div>
        </StyledA>
      </Link>
    </Main>
  );
};

export default Home;
