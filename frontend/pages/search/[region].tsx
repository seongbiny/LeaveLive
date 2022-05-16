import { useState, useEffect } from "react";
import Seo from "../../components/Seo";
import Image from "next/image";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useRouter } from 'next/router';
import { bnbList } from '../../api/bnb';
import Item from "../../components/search/Item";
import { activityList } from "../../api/activity";

interface TypeBnb{
  id: number;
  contents: string;
  cooking: string;
  garden: string;
  loc: string;
  name: string;
  picPath: string;
};

interface TypeActivity{
  id: number;
  cnt: number;
  contents: string;
  loc: string;
  name: string;
  picContents: string;
  picPath: string;
  price: number;
  userId: number;
};

const Region = () => {
  const router = useRouter();
  // const region = router.query.region;
  const [region, setRegion] = useState(router.query.region);
  const [bnbItem, setBnbItem] = useState<Array<TypeBnb>>([]);
  const [activityItem, setActivityItem] = useState<Array<TypeActivity>>([]);

  const check = (name: any) => {
    if(name==='전라남도') {setRegion('전남')}
  }

  useEffect(() => {
    check(region);
    bnbList(
      region,
      ({ data }: any) => {
        setBnbItem(data.sort(()=>Math.random()-0.5).slice(0,1));
        // console.log(data.sort(()=>Math.random()-0.5).slice(0,1));
      },
      (error: Error) => console.log(error)
    );
    activityList(
      region,
      ({ data }: any) => {
        setActivityItem(data.sort(()=>Math.random()-0.5).slice(0,1));
        console.log(data.sort(()=>Math.random()-0.5).slice(0,1));
      },
      (error: Error) => console.log(error)
    );
  }, [region]);

  return (
    <Container>
      <Seo title="Main" />
      <StyledBox>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text><div>{region}</div><div>여행 어때요?</div></Text>
      </StyledBox>
      <Main>
        {/* <div style={{marginTop: '2vh', marginBottom: '2vh'}}>이 지역에 살아본 사람들은 하루 평균 50,000원을 썼어요.</div> */}
        <Tab>
          <Box sx={{ '& > :not(style)': { m: 1 }, mb: '1vh' }}>
            <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={()=>{router.push(`/reservation/${region}/bnb`)}}>
              <NavigationIcon sx={{ mr: 1 }} />
              숙소
            </Fab>
            <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={()=>{router.push(`/reservation/${region}/activity`)}}>
              <NavigationIcon sx={{ mr: 1 }} />
              액티비티
            </Fab>
          </Box>
        </Tab>
        <div style={{display: 'grid'}}>
          <Title>추천 숙소</Title>
          {bnbItem.length !== 0 && <Item list={bnbItem} url="bnb" /> }
          <Title>추천 액티비티</Title>
          {activityItem.length !== 0 && <Item list={activityItem} url="activity" />}
        </div>
      </Main>
    </Container>
  )
};

const Title = styled.div`
  margin: 2vh;
  font-size: 20px;
`;

const StyledBox = styled.div`
  position: relative;
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1vh;
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 65%;
  left: 10%;
  font-size: 25px
`;

const Main = styled.div`
  margin-left: 2vh;
  margin-right: 2vh;
`;
const Container = styled.div`
  margin-bottom: 10vh;
`;

export default Region;
