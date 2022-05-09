import React, { useEffect } from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MainSlider from "../../components/main/MainSlider";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useRouter } from 'next/router'

const Main = styled.div`
  margin-left: 2vh;
  margin-right: 2vh;
`;
const Container = styled.div`
  margin-bottom: 10vh;
`;

const Region = () => {
  const router = useRouter();
  
  return (
    <Container>
      <Seo title="Main" />
      <StyledBox>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text>{router.query.region}로 여행 어때요?</Text>
      </StyledBox>
      <Main>
        <div style={{marginTop: '2vh', marginBottom: '2vh'}}>이 지역에 살아본 사람들은 하루 평균 50,000원을 썼어요.</div>
        <Tab>
          <Box sx={{ '& > :not(style)': { m: 1 }, mb: '2vh' }}>
            <Fab variant="extended" size="small" color="primary" aria-label="add" >
              <NavigationIcon sx={{ mr: 1 }} />
              숙소
            </Fab>
            <Fab variant="extended" size="small" color="primary" aria-label="add">
              <NavigationIcon sx={{ mr: 1 }} />
              액티비티
            </Fab>
          </Box>
        </Tab>
        <div>한달 살기 인기 숙소</div>
        <MainSlider />
        <div>한달 살기 인기 액티비티</div>
        <MainSlider />
      </Main>
    </Container>
  )
};

const StyledBox = styled.div`
  position: relative;
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 65%;
  left: 10%;
`;

export default Region;
