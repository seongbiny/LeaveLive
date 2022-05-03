import React from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MenuTab from '../../components/main/MenuTab';
import Schedule from "../../components/main/schedule";
import MainSlider from "../../components/main/MainSlider";



const Main = () => {
  
  return (
    <Container>
      <Seo title="Main" />
      <Box>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
      </Box>
      {/* <Text>김당당님, 즐거운 여행 되고 계신가요?</Text> */}
      <Body>
        <MenuTab/>
        <Schedule day={'오늘'}/>
        <Schedule day={'내일'}/>
      </Body>
    </Container>
  )
};

const Box = styled.div`
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // position: absolute;
  width: 100%;
  height: 25vh;
  box-sizing: border;
  background: green;
`;
const Text = styled.div`
  // z-index: 100;
  // position: absolute;
  // top: 15vh;
  // left: 5vw;
  // color: white;
`;
const Container = styled.div`
  // position: relative;
`;
const Body = styled.div`
  // display: grid;
  // margin-top: 30vh;
`;

export default Main;
