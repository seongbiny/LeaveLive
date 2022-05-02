import type { NextPage } from "next";
import Seo from "../src/components/Seo";
import useIsMobile from "../util/hooks";
import styled from 'styled-components';

const Main = styled.div`
  border: 1px solid;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Home: NextPage = () => {
  const isMobile = useIsMobile();

  return <Container>
      <Seo title="Home" />
      { isMobile ?
        <Main>
          <div>낯선 천장이다..</div>
          <div>기억이 하나도 안나.. 나는 누구였지..?</div>
          <div>여행을 가려고 했다.</div>
          <div>집을 가지고 있다.</div>
        </Main> : <>모바일로 접속해주세요.</>
      }
    </Container>
};

export default Home;
