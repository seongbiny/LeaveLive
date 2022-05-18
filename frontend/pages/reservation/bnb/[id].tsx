import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import { useCallback, useEffect, useState } from "react";
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
import { bnbDetail, bnbReservation, getPossible } from "../../../api/bnb";
import { useRouter } from 'next/router';
import { format } from "date-fns";
import DotInfo from "../../../components/reservation/dotInfo";
import { flexCenter } from '../../../styles/Basic';

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

const CalendarContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 100%;
  margin-top: 1vh;
`;


interface IBnbDates {
  startDate: Date;
  endDate: Date;
}

const ReservationBnb = () => {
  const router = useRouter();
  const id = router.query.id;
  const [cnt, setCnt] = useState(0);
  const [bnbDates, setBnbDates] = useState<Array<IBnbDates>>([]);
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
    if(reservationCnt > cnt){
      alert(`최대 ${cnt}명 예약 가능합니다.`)
    } else {
      const dto = {
          cnt: reservationCnt,
          startDate: reservationStart,
          endDate: reservationEnd,
        };
      await bnbReservation(
      id,
      dto,
      ({ data }: any) => {
          router.push(`/reservation/bnb/result/${data}`)
      },
      (error: Error) => {console.log(error), alert("예약 불가한 날짜입니다.")}
      )
    }
  }

  useEffect(()=>{
    getPossible(
      id,
      ({ data }: any) => {
        setBnbDates(
          data.map((item: any)=>({
            startDate: new Date(item.startDate.join("-")),
            endDate: new Date(item.endDate.join("-")),
          }))
        );
      },
      (error: Error) => console.log(error)
    )
    bnbDetail(
      id,
      ({ data }: any) => setCnt(data.cnt),
      (error: Error) => console.log(error)
    )
  },[])

  const customDayContent = useCallback((day: Date) => {
    let extraDot: any = null;
    for(let i = 0; i < bnbDates.length; i++) {
      if (
        (bnbDates[i].startDate <= day) && 
        (day < bnbDates[i].endDate)
      ) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "orange",
              position: "absolute",
              top: 2,
              right: 2,
            }}
          />
        );
        break;
      }
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }, [bnbDates]);

  return (
    <div style={{marginBottom: '10vh'}}>
    
      <Container>
        <StyledTab>
          <CloseIcon onClick={()=>(Router.back())} />
          <div>예약하기</div>
          <CloseIcon sx={{color:'#60ffc6'}}/>
        </StyledTab>
        
        <div style={{paddingLeft:'4vw', fontSize: '1.2rem'}}>날짜를 선택하세요.</div>
        <CalendarContainer>
          <DotInfo />
          <DateRange
            // @ts-ignore
            locale={locale}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            rangeColors={[theme.palette.primary.main]}
            ranges={state}
            months={2}
            onChange={(range: any) => {setState([range.selection]); setStartDate([range.selection][0].startDate); setEndDate([range.selection][0].endDate)}}
            dayContentRenderer={customDayContent}
          />
        </CalendarContainer>

        <div style={{paddingLeft:'4vw', fontSize: '1.2rem', paddingBottom:'2vh'}}>인원을 선택하세요.</div>
        <hr />
        <Tabs>
          <div>
            <div style={{fontSize: '1.1rem', paddingBottom: '1vh'}}>성인</div>
            <div style={{fontSize: '0.8rem', color: 'gray'}}>만 13세 이상</div>
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
            <div style={{fontSize: '1.1rem', paddingBottom: '1vh'}}>어린이</div>
            <div style={{fontSize: '0.8rem', color: 'gray'}}>만 2~12세</div>
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
            <div style={{fontSize: '1.1rem', paddingBottom: '1vh'}}>유아</div>
            <div style={{fontSize: '0.8rem', color: 'gray'}}>만 2세 미만</div>
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
    </div>
  )
}
export default ReservationBnb;