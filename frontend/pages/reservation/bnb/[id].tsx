import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import { useCallback, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import locale from 'date-fns/locale/ko';
import theme from "../../../styles/Theme";
import styled from "styled-components";
import Router from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import { bnbReservation } from "../../../api/bnb";
import { useRouter } from 'next/router';

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // margin-bottom: 10vh;
`;
const StyledTab = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7vh;
  align-items: center;
  background: #60ffc6;
  margin-bottom: 3vh;
  padding-left: 3vw;
  padding-right: 3vw;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5vw;
  padding-right: 5vw;
`
const BottomNav = styled.div`
  // position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  // border: 1px solid;
`;

const ReservationBnb = () => {
  const router = useRouter();
  const id = router.query.id;
  const [adult, setAdult] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [baby, setBaby] = useState(0);
  const [startDate, setStartDate] = useState<[string]>(['']);
  const [endDate, setEndDate] = useState<[string]>(['']);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ])
  const startDay = String(startDate).split(' ');
  const endDay = String(endDate).split(' ');
  const [reservationCnt, setReservationCnt] = useState(0);
  // const reservationCnt = children+baby+adult;
  
  const MonChange = (mon: any) => {
    if (mon === 'Jan') {
      return startDay[1] = '01'
    } else if (mon === 'Feb') {
      return startDay[1] = '02'
    } else if (mon === 'Mar') {
      return startDay[1] = '03'
    } else if (mon === 'Apr') {
      return startDay[1] = '04'
    } else if (mon === 'May') {
      return startDay[1] = '05'
    } else if (mon === 'Jun') {
      return startDay[1] = '06'
    } else if (mon === 'Jul') {
      return startDay[1] = '07'
    } else if (mon === 'Aug') {
      return startDay[1] = '08'
    } else if (mon === 'Sep') {
      return startDay[1] = '09'
    } else if (mon === 'Oct') {
      return startDay[1] = '10'
    } else if (mon === 'Nov') {
      return startDay[1] = '11'
    } else {
      return startDay[1] = '12'
    }
  }

  const reservationStart = startDay[3]+'-'+MonChange(startDay[1])+'-'+startDay[2];
  const reservationEnd = endDay[3]+'-'+MonChange(endDay[1])+'-'+endDay[2]

  async function reservationAxios(){
    const dto = {
        cnt: reservationCnt,
        startDate: reservationStart,
        endDate: reservationEnd,
      };
    console.log(dto)
    await bnbReservation(
    id,
    dto,
    ({ data }: any) => {
        console.log(data);
        router.push(`/reservation/bnb/result/${data}`)
    },
    (error: Error) => console.log(error)
    )
  }

  return (
    <>
    
      <Container>
        <StyledTab>
          <CloseIcon onClick={()=>(Router.back())} />
          <div>예약하기</div>
          <CloseIcon sx={{color:'#60ffc6'}}/>
        </StyledTab>
        
        <div>날짜를 선택하세요.</div>
        <div style={{textAlign: 'center'}}>
          <DateRange
            // @ts-ignore
            locale={locale}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            rangeColors={[theme.palette.primary.main]}
            ranges={state}
            months={2}
            onChange={(range: any) => {setState([range.selection]); setStartDate([range.selection][0].startDate); setEndDate([range.selection][0].endDate)}}
          />
        </div>

        <div>인원을 선택하세요.</div>
        <hr />
        <Tabs>
          <div>
            <div>성인</div>
            <div>만 13세 이상</div>
          </div>
          <div>
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setAdult(adult+1), setReservationCnt(reservationCnt+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{adult}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setAdult(adult-1), setReservationCnt(reservationCnt-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
        <Tabs>
          <div>
            <div>어린이</div>
            <div>만 2~12세</div>
          </div>
          <div>
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setChildren(children+1), setReservationCnt(reservationCnt+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{children}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setChildren(children-1), setReservationCnt(reservationCnt-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
        <Tabs>
          <div>
            <div>유아</div>
            <div>만 2세 미만</div>
          </div>
          <div>
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setBaby(baby+1), setReservationCnt(reservationCnt+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{baby}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setBaby(baby-1), setReservationCnt(reservationCnt-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
      </Container>
      <BottomNav>
        <Button variant="contained" size="large" sx={{width: '60vw'}} onClick={reservationAxios}>예약하기</Button>
      </BottomNav>
    </>
  )
}
export default ReservationBnb;