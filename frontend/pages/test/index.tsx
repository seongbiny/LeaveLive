// 테스트 하는 페이지
import type { NextPage } from "next";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {useRouter} from 'next/router';
import styled from 'styled-components';
interface Props {
  step?: number;
  setStep: Dispatch<SetStateAction<number>>;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Test: NextPage = () => {

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    console.log(step);
  },[step])

  return (
    <Container>
      {/* <audio autoPlay controls src="/bgm.mp3" /> */}
      {step === 0 && <Test1 setStep={setStep}></Test1> }
      {step === 1 && <Test2 setStep={setStep}></Test2> }
      {step === 2 && <Test3 setStep={setStep}></Test3> }
      {step === 3 && <Test4 /> }
      {step === 4 && <Test5 /> }
      {step === 5 && <Test6 /> }
      {step === 6 && <Test7 /> }
    </Container>
  )
};

const Test1: NextPage<Props> = ({setStep}) => {
  const router = useRouter();

  return(
    <>
      <Progress><Bar barWidth="33%" /><img style={{position: 'absolute', top:'2%', left: '30%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div>
          <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문1</div>
          <div>자연에서 쉬고싶다.</div>
        </div>
        <Option style={{width: '40vw'}} onClick={()=>(setStep(1))}>Yes</Option>
        <Option style={{width: '40vw'}} onClick={()=>(setStep(2))}>No</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test2: NextPage<Props> = ({setStep}) => {
  const router = useRouter();
  return (
    <>
      <Progress><Bar barWidth="66%" /><img style={{position: 'absolute', top:'2%', left: '50%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div>
          <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문2</div>
          <div>산이 좋아? 바다가 좋아?</div>
        </div>
        <Option style={{width: '50vw'}} onClick={()=>(setStep(3))}>산이 좋다.</Option>
        <Option style={{width: '50vw'}} onClick={()=>(setStep(4))}>바다가 좋다.</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test3: NextPage<Props> = ({setStep}) => {
  const router = useRouter();
  return (
    <>
      <Progress><Bar barWidth="66%" /><img style={{position: 'absolute', top:'2%', left: '50%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div>
          <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문2</div>
          <div>더 좋아하는 여행 분위기는?</div>
        </div>
        <Option style={{width: '75vw'}} onClick={()=>(setStep(5))}>도시가 좋다.</Option>
        <Option style={{width: '75vw'}} onClick={()=>(setStep(6))}>조용한 휴양지가 좋다.</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test4: NextPage = () => {
  const router = useRouter();

  const handleClick_5 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '전라북도 전주' },
    })
  }

  const handleClick_6 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '충청남도 논산' },
    })
  }

  return (
    <>
      <Progress><Bar barWidth="99%" /><img style={{position: 'absolute', top:'2%', left: '80%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div>
          <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문3</div>
          <div>여행은 역시 맛집탐방이다.</div>
        </div>
        <Option style={{width: '30vw'}} onClick={handleClick_5}>Yes</Option>
        <Option style={{width: '30vw'}} onClick={handleClick_6}>No</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test5: NextPage = () => {
  const router = useRouter();

  const handleClick_7 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '경상북도 포항' },
    })
  }

  const handleClick_8 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '제주도' },
    })
  }
  return (
    <>
      <Progress><Bar barWidth="99%" /><img style={{position: 'absolute', top:'2%', left: '80%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div>
          <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문3</div>
          <div>이색적이고 특별한 곳이 좋다.</div>
        </div>
        <Option style={{width: '40vw'}} onClick={handleClick_7}>Yes</Option>
        <Option style={{width: '40vw'}} onClick={handleClick_8}>No</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test6: NextPage = () => {
  const router = useRouter();

  const handleClick_9 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '강원도 강릉' },
    })
  }

  const handleClick_10 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '경상남도 거제' },
    })
  }
  return (
    <>
      <Progress><Bar barWidth="99%" /><img style={{position: 'absolute', top:'2%', left: '80%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div style={{fontSize: '1.7rem', fontWeight:'bold'}}>질문3</div>
        <Option style={{width: '75vw'}} onClick={handleClick_9}>역사 유적 탐방이 좋다.</Option>
        <Option style={{width: '75vw'}} onClick={handleClick_10}>유명한 곳이 좋다.</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
}

const Test7: NextPage = () => {
  const router = useRouter();

  const handleClick_11 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '충청북도 청주' },
    })
  }

  const handleClick_12 = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/test/result',
      query: { region: '광주광역시' },
    })
  }
  return (
    <>
      <Progress><Bar barWidth="99%" /><img style={{position: 'absolute', top:'2%', left: '80%'}} src="/train.png" height={60} width={60} /></Progress>
      <Main style={{height: '35vh'}}>
        <div style={{fontSize: '1.7rem', fontWeight:'bold', paddingBottom:'1vh'}}>질문3</div>
        <div>수도권기준! 거리는?</div>
        <Option style={{width: '60vw'}} onClick={handleClick_11}>가까운게 좋다.</Option>
        <Option style={{width: '60vw'}} onClick={handleClick_12}>먼게 좋다.</Option>
      </Main>
      <Hover style={{fontSize: '15px'}} onClick={()=>{router.push('/search/map')}}>skip</Hover>
    </>
  )
};
const Container = styled.div`
  height: 94%;
  width: 100%;
  justify-content: space-between;
  padding-top: 5vh;
  padding-bottom: 5vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  // font-size: 1rem;
  text-align: center;
  background-color: rgb(229,240,216);
  color: rgb(114,163,80);
  // font-weight: bold;
`;
const Progress = styled.div`
  background-color: white;
  height: 1.4vh;
  width: 85vw;
  border-radius: 10px;
`;
const Bar = styled.div< { barWidth:string } >`
  background-color: rgb(114,163,80);
  height: 0.8vh;
  margin-top: 0.3vh;
  border-radius: 10px;
  width: ${(props) => props.barWidth};
  position: relative;
`;
const Option = styled.div`
  border-radius: 20px;
  background: white;
  height: 8vh;
  line-height: 8vh;
  box-shadow: 10px 10px 10px #808080;
  margin: auto;
  font-size: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`;
const Main = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  row-gap: 3vh;
`;

const Hover = styled.div`
  &:hover {
    cursor: pointer;
  } 
`;
export default Test;


