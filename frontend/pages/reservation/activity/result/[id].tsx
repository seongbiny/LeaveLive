import styled from "styled-components";
import Button from '@mui/material/Button';
import Router from "next/router";
import { getActivityList } from "../../../../api/activity";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vh;
  width: 75vw;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-bottom: 20vh;
  text-align: center;
  background-color: lightgray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 20vh;
`

const Confirm = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const id = router.query.id;

  useEffect(()=>{
    getActivityList(
      null,
      ({ data }: any) => {
        console.log(data);
        {data.map((item: any)=>{
            if(Number(id)===item.id){
                setList(item)
                setName(item.activity.name)
                setStartDay(item.startDate[0]+'년'+item.startDate[1]+'월'+item.startDate[2]+'일')
                setEndDay(item.endDate[0]+'년'+item.endDate[1]+'월'+item.endDate[2]+'일')
            }
        })}
      },
      (error: Error) => console.log(error)
    )
  },[]);

  return (
    <Container>
      <Box>
          {list.length !== 0 &&
            <>
                <div>{name}</div>
                <hr />
                <div>{startDay} 부터</div>
                <div>{endDay} 까지</div>
                <div>예약되었습니다.</div>
            </>
          }
      </Box>
      <Button variant="contained" size="large" sx={{width: '60vw'}} onClick={()=>(Router.push(`/diary`))}>내 여행 일정보기</Button>
    </Container>
  )
};

export default Confirm;
