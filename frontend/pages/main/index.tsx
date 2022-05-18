import { useEffect, useState, useCallback } from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import MenuTab from '../../components/main/MenuTab';
import { getUserInfo } from "../../api/user";
import { getDiary } from "../../api/diary";
import Item from "../../components/main/Item";
import { useRouter } from "next/router";
import { postActivity } from "../../api/activity";

interface IProps {
  content: string,
  date: string,
  diaryId: number,
  picPath: string,
  status: string,
  tag: string
}

const Main = () => {
  const router = useRouter();
  const [nickName, setNickName] = useState('');
  const [diary, setDiary] = useState<IProps>({
    content: '',
    date: '',
    diaryId: 0,
    picPath: '',
    status: '',
    tag: ''
  });
  const [diaryTom, setDiaryTom] = useState<IProps>({
    content: '',
    date: '',
    diaryId: 0,
    picPath: '',
    status: '',
    tag: ''
  });

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
    getDiary(
      day,
      ({ data }: any) => {console.log(data), setDiary(data)},
      (error: Error) => console.log(error)
    )
    getDiary(
      tom,
      ({ data }: any) => {console.log(data), setDiaryTom(data)},
      (error: Error) => console.log(error)
    )
  },[])

  return (
    <div style={{marginBottom: '13vh'}}>
      <Seo title="Main" />
      <Box>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text><span style={{color: '#00cf95'}}>{nickName}님</span>, <br/> 즐거운 여행 되고 계신가요?</Text>
      </Box>
      <MenuTab/>
      <div style={{marginBottom:'2vh', marginLeft: '5vw', fontWeight: 'bold'}}>오늘 나의 일정</div>
      {diary.diaryId !== 0 ? <div style={{ margin: "3vh" }}>
        <Item diary={diary} onClick={()=>{router.push(`/diary`)}} />
        </div> : <StyledError>일정이 없습니다.</StyledError>
      }
      <div style={{marginBottom:'2vh', marginLeft: '5vw', fontWeight: 'bold'}}>내일 나의 일정</div>
      {diaryTom.diaryId !== 0 ? <div style={{ margin: "3vh" }}>
        <Item diary={diaryTom} onClick={()=>{router.push(`/diary`)}} />
        </div> : <StyledError>일정이 없습니다.</StyledError>
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
