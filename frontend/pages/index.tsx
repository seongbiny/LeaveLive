import type { NextPage } from "next";
import Seo from "../components/Seo";
import styled from "styled-components";
import Link from "next/link";

const Main = styled.div`
  border: 1px solid;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Seo title="Home" />
      <div>낯선 천장이다..</div>
      <div>기억이 하나도 안나.. 나는 누구였지..?</div>
      <Link
        href={{ pathname: "/login", query: { type: "user" } }}
        as={`/login`}
      >
        <a>
          <div>여행을 가려고 했다.</div>
        </a>
      </Link>

      <Link href={{ pathname: "/login", query: { type: "ceo" } }} as={`/login`}>
        <a>
          <div>집을 가지고 있다.</div>
        </a>
      </Link>
    </div>
  );
};

export default Home;
