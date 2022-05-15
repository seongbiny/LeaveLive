import styled from 'styled-components';
import { useRouter } from "next/router";
import Map from "../../components/search/map";

const Container = styled.div`
  // background-color: green;
  // border: 1px solid;
  display: grid;
  align-items: center;
  margin-top: 15vh;
  margin-left: 5vw;
`
const StyledMap = styled(Map)`
  &:hover{
    path {
      fill: red;
    }
  }
  path {
    fill: blue;
  }
`;

const KoreaMap = () => {
  const router = useRouter();
  const region = ['부산', '대구', '대전', '강원', '광주', '경기', '인천', '제주', '충청북도', '경상북도', '전라북도', '세종', '서울', '충청남도', '경상남도', '전라남도', '울산']
  return (
    <Container>
      <Map width="100%" height="100%" fill={"lightgreen"} stroke={"lightgreen"} fillOpacity={0.5} />
    </Container>
  )
};

export default KoreaMap;
