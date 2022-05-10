import styled from "styled-components";
import Button from '@mui/material/Button';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vh;
  width: 70vw;
  // border: 1px solid;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-bottom: 20vh;
  text-align: center;
  background-color: #d3d3d3;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px solid;
  height: 100%;
  width: 100%;
  padding-top: 20vh;
`

const Confirm = () => {
  return (
    <Container>
      <Box>
        <div>에버랜드</div>
        <div>예약 요청이<br />완료되었어요!</div>
      </Box>
      <Button variant="contained" size="large" sx={{width: '60vw'}} onClick={()=>(Router.push(`/reservation/result`))}>내 여행 일정보기</Button>
    </Container>
  )
};

export default Confirm;
