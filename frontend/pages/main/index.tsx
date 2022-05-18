import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MenuTab from '../../components/main/MenuTab';
import { getUserInfo } from "../../api/user";
import { useRouter } from "next/router";
import { getBnbReservation } from "../../api/bnb";
import { getActivityReservation } from "../../api/activity";
import MainSlider from "../../components/main/MainSlider";

const Main = () => {
  const router = useRouter();
  const [nickName, setNickName] = useState('');

  const [act, setAct] = useState<Array<Object>>([]);
  const [bnb, setBnb] = useState<Array<Object>>([]);
  const [actTom, setActTom] = useState<Array<Object>>([]);
  const [bnbTom, setBnbTom] = useState<Array<Object>>([]);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year+"-"+month+"-"+day
  }

  const getTommorow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + (Number(date.getDate())+Number(1))).slice(-2);
    return year+"-"+month+"-"+day
  }

  useEffect(()=>{
    const day = getToday();
    const tom = getTommorow();
    getUserInfo(
      null,
      ({ data }: any) => {setNickName(data.nickname)},
      (error: Error) => console.log(error)
    )
    getBnbReservation(
      day,
      ({ data }: any) => {setBnb(data)},
      (error: Error) => console.log(error)
    )
    getActivityReservation(
      day,
      ({ data }: any) => {setAct(data)},
      (error: Error) => console.log(error)
    )
    getBnbReservation(
      tom,
      ({ data }: any) => {setBnbTom(data)},
      (error: Error) => console.log(error)
    )
    getActivityReservation(
      tom,
      ({ data }: any) => {setActTom(data)},
      (error: Error) => console.log(error)
    )
  },[])

  return (
    <div style={{marginBottom: '17vh'}}>
      <Seo title="Main" />
      <Box>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text><span style={{color: '#00cf95'}}>{nickName}님</span>, <br/> 즐거운 여행 되고 계신가요?</Text>
      </Box>
      <MenuTab/>
      <div style={{marginBottom:'2vh', marginLeft: '5vw', fontWeight: 'bold'}}>오늘 나의 일정</div>
      {(act.length !== 0) || (bnb.length !== 0) ?
        <MainSlider act={act} bnb={bnb} /> : <StyledError>일정이 없습니다.</StyledError>
      }
      <div style={{marginBottom:'2vh', marginLeft: '5vw', fontWeight: 'bold'}}>내일 나의 일정</div>
      {(actTom.length !== 0) || (bnbTom.length !== 0) ?
        <MainSlider act={actTom} bnb={bnbTom} /> : <StyledError>일정이 없습니다.</StyledError>
      }
    </div>
  )
};

const StyledError = styled.div`
  width: 70%;
  height: 20vh;
  color: gray;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  line-height: 20vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
  border: 1px dashed;
`;

const Box = styled.div`
  position: relative;
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 65%;
  left: 10%;
  font-size: 1rem
`;

export default Main;
