import { useRouter } from 'next/router'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { ColoredText, BoldText } from '../../styles/Text';
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 20vh;
  align-items: center;
  font-size: 20px;
`;

const TextContainer = styled.div`
  font-size: 1.3rem;
  line-height: 2.2rem;
`;

const Result = () => {
  const router = useRouter();
  const result = router.query.region;
  const [name, setName] = useState(String(router.query.region).split(" ")[0]);
  console.log(String(router.query.region).split(" ")[0]);

  const check = (name: any) => {
    if(name==='전라남도') {setName('전남')}
    else if(name==='전라북도') {setName('전북')}
    else if(name==='경상남도') {setName('경남')}
    else if(name==='경상북도') {setName('경북')}
    else if(name==='충청남도') {setName('충남')}
    else if(name==='충청북도') {setName('충북')}
  }

  useEffect(()=>{
    check(result);
  },[result])

  return (
    <Container>
      <div style={{width: '70%', marginBottom: '3vh'}}>
        {result === '경상북도 포항' && 
          <TextContainer>
            <BoldText><ColoredText>열정적</ColoredText>이고 <ColoredText>역동적인 에너지</ColoredText>가 가득한 청춘여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>경상북도 포항</ColoredText>
          </TextContainer>}
        {result === '제주도' && 
          <TextContainer>
            <BoldText>유명한 <ColoredText>관광지 여행</ColoredText>을 좋아하는 <ColoredText>알짜배기</ColoredText> 여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>제주도</ColoredText>
          </TextContainer>}
        {result === '경상남도 거제' && 
          <TextContainer>
            <BoldText><ColoredText>탁 트인 바다</ColoredText>를 바라보며 느긋하게 <ColoredText>힐링</ColoredText>하는 여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>경상남도 거제</ColoredText>
          </TextContainer>}
        {result === '강원도 강릉' &&
          <TextContainer>
            <BoldText><ColoredText>푸르른 산속</ColoredText>의 <ColoredText>맑은 공기</ColoredText>와 함께 여유를 즐기는 여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>강원도 강릉</ColoredText>
          </TextContainer>}
        {result === '광주광역시' && 
          <TextContainer>
            <BoldText>여행지의 <ColoredText>이색적인 음식</ColoredText>과 <ColoredText>역사</ColoredText>를 즐기는 여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>광주광역시</ColoredText>
          </TextContainer>}
        {result === '전라북도 전주' && 
          <TextContainer>
            <BoldText><ColoredText>여행지 전통 본연</ColoredText>의 <ColoredText>맛</ColoredText>과<ColoredText>문화</ColoredText>를 즐기는 여행 스타일~! </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>전라북도 전주</ColoredText>
          </TextContainer>}
        {result === '충청남도 논산' && 
          <TextContainer>
            <BoldText><ColoredText>근교 나들이</ColoredText>같은 <ColoredText>느긋한 자연</ColoredText> 속 힐링 하는 여행 스타일!  </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>충청남도 논산</ColoredText>
          </TextContainer>}
        {result === '충청북도 청주' && 
          <TextContainer>
            <BoldText><ColoredText>감성적</ColoredText>이고 <ColoredText>따뜻한 분위기</ColoredText>를 즐기는 여행 스타일 </BoldText>
            < br />
            < br />
            < br />
            <ColoredText style={{fontSize:'30px'}}>충청북도 청주</ColoredText>
          </TextContainer>}
      </div>
      <div style={{marginTop: '25vh'}} onClick={()=>{router.push(`/search/${name}`)}}>
        <Button variant="contained" >여행가기</Button>
      </div>
    </Container>
  )
};

export default Result;
