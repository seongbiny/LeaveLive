import { useCallback, useEffect, useState } from "react";
import { getbnbList } from "../../../api/user";
import axios from "axios";
import { FRONTEND_URL } from "../../../api";
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/router';
import BnbItem from "../../../components/reservation/bnbitem";

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

const BnbList = () => {

  useEffect(() => {
    const fetchBnbList = async() => {
      try {
        const request = await axios.get(`http://k6c105.p.ssafy.io/api/accommodation/all?accommodation_loc='광주'`);
        console.log(request);
      } catch(err) {
        console.log(err);
      }
    };
    fetchBnbList();
    console.log('hi')
  }, [])
  const router = useRouter();

  return (
    <div style={{marginBottom: '10vh'}}>
      <StyledTab>
        <ArrowBackIosNewIcon onClick={()=>(router.back())} />
        <div>광주</div>
        <ArrowBackIosNewIcon sx={{color:'#60ffc6'}}/>
      </StyledTab>
      <div>
        <BnbItem />
        <BnbItem />
        <BnbItem />
      </div>
    </div>
  )
};

export default BnbList;
