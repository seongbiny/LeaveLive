import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import locale from 'date-fns/locale/ko';
import theme from "../../styles/Theme";
import styled from "styled-components";
import Router from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';

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

const Reservation = () => {
  // const router = useRouter();
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
  console.log(startDate);
  console.log(endDate);

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
            onChange={(range) => {setState([range.selection]); setStartDate([range.selection][0].startDate); setEndDate([range.selection][0].endDate)}}
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
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setAdult(adult+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{adult}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setAdult(adult-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
        <Tabs>
          <div>
            <div>어린이</div>
            <div>만 2~12세</div>
          </div>
          <div>
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setChildren(children+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{children}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setChildren(children-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
        <Tabs>
          <div>
            <div>유아</div>
            <div>만 2세 미만</div>
          </div>
          <div>
            <Fab size="small" aria-label="add"><AddIcon onClick={()=>(setBaby(baby+1))} /></Fab>
              <div style={{width:'10vw', display:'inline-block', textAlign:'center'}}>{baby}</div>
            <Fab size="small" aria-label="remove"><RemoveIcon onClick={()=>(setBaby(baby-1))} /></Fab>
          </div>
        </Tabs>
        <hr />
      </Container>
      <BottomNav>
        <Button variant="contained" size="large" sx={{width: '60vw'}} onClick={()=>(Router.push(`/reservation/result`))}>예약하기</Button>
      </BottomNav>
    </>
  )
}
export default Reservation;