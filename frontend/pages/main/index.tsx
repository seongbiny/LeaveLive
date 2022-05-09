import React, { useEffect } from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MenuTab from '../../components/main/MenuTab';
import Button from '@mui/material/Button';
import Schedule from "../../components/main/schedule";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 25vh;
  border: 1px solid;
`;

const Main = () => {
  
  return (
    <div style={{marginBottom: '10vh'}}>
      <Seo title="Main" />
      <Box>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text>김당당님, 즐거운 여행 되고 계신가요?</Text>
      </Box>
      <MenuTab/>
      {/* <Container>
        <div>+</div>
        <Button size="large" variant="contained" style={{width:'90%'}}>추가하기</Button>
      </Container> */}
      <Schedule day={'오늘'}/>
      <Schedule day={'내일'}/>
    </div>
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
