import React from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MenuTab from '../../components/main/MenuTab';
import Schedule from "../../components/main/schedule";

const Main = () => {
  
  return (
    <>
      <Seo title="Main" />
      <Box>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text>김당당님, 즐거운 여행 되고 계신가요?</Text>
      </Box>
      <MenuTab/>
      <Schedule day={'오늘'}/>
      <Schedule day={'내일'}/>
    </>
  )
};

const Box = styled.div`
  position: relative;
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 65%;
  left: 10%;
`;

export default Main;
