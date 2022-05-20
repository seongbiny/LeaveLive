import styled from "styled-components";
import Map from "../../components/search/map";
import Seo from '../../components/Seo';

const Container = styled.div`
  display: grid;
  align-items: center;
  margin-top: 3vh;
  margin-bottom: 13vh;
`;

const KoreaMap = () => {
  return (
    <Container>
      <Seo title="지도" />
      <div
        style={{
          marginBottom: "5vh",
          fontSize: "1.3rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        어디로 갈까요?
      </div>
      <Map
        width="100%"
        height="90%"
        fill={"lightgreen"}
        stroke={"lightgreen"}
        fillOpacity={0.5}
      />
    </Container>
  );
};

export default KoreaMap;
