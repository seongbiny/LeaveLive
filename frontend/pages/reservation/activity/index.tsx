import styled from 'styled-components';
import axios from "axios";
import { useRouter } from 'next/router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ActivityItem from '../../../components/reservation/activityItem';

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

const ActivityList = () => {
  const router = useRouter();
  return (
    <div style={{marginBottom: '10vh'}}>
      <StyledTab>
        <ArrowBackIosNewIcon onClick={()=>(router.back())} />
        <div>광주</div>
        <ArrowBackIosNewIcon sx={{color:'#60ffc6'}}/>
      </StyledTab>
      <div>
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
      </div>
    </div>
  )
};

export default ActivityList;
