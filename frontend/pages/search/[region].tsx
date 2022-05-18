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
  const region = router.query.region;
  const [bnbItem, setBnbItem] = useState<Array<TypeBnb>>([]);
  const [activityItem, setActivityItem] = useState<Array<TypeActivity>>([]);

  useEffect(() => {
    if (region === '제주도') {
      bnbList(
        '제주특별자치도',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='강원도') {
      bnbList(
        '강원',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라남도') {
      bnbList(
        '전남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라북도') {
      bnbList(
        '전북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상남도') {
      bnbList(
        '경남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상북도') {
      bnbList(
        '경북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청남도') {
      bnbList(
        '충남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청북도') {
      bnbList(
        '충북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else {
      bnbList(
        region,
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setBnbItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
  }, [region]);

  useEffect(()=>{
    if (region === '제주도') {
      activityList(
        '제주특별자치도',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='강원도') {
      activityList(
        '강원',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라남도') {
      activityList(
        '전남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라북도') {
      activityList(
        '전북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상남도') {
      activityList(
        '경남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
          console.log(data.slice(0,1))
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상북도') {
      activityList(
        '경북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
          console.log(data.slice(0,1))
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청남도') {
      activityList(
        '충남',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
          console.log(data.slice(0,1))
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청북도') {
      activityList(
        '충북',
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    } else {
      activityList(
        region,
        ({ data }: any) => {
          data.sort(()=>Math.random()-0.5);
          setActivityItem(data.slice(0,1));
        },
        (error: Error) => console.log(error)
      )
    }
  },[region])

  return (
    <Container>
      <Seo title="Main" />
      <StyledBox>
        <Image src="/main-background.png" alt="main" title="main" width="100%" height="56%" layout="responsive" objectFit="contain"/>
        <Text><div>{region}</div><div>여행 어때요?</div></Text>
      </StyledBox>
      <Main>
        <Tab>
          <Box sx={{ '& > :not(style)': { m: 1 }, mb: '1vh' }}>
            <Fab sx={{ padding: 2 }} variant="extended" size="small" color="primary" aria-label="add" onClick={()=>{router.push(`/reservation/${region}/bnb`)}}>
              <NavigationIcon sx={{ mr: 1 }} />
              숙소
            </Fab>
            <Fab variant="extended" size="small" color="primary" aria-label="add" onClick={()=>{router.push(`/reservation/${region}/activity`)}}>
              <NavigationIcon sx={{ mr: 1 }} />
              액티비티
            </Fab>
          </Box>
        </Tab>
        <div style={{display: 'grid'}}>
          <Title>추천 숙소</Title>
          {bnbItem.length !== 0 ? <Item list={bnbItem} url="bnb" /> :
            <StyledError>숙소가 없습니다.</StyledError>
          }
          <Title>추천 액티비티</Title>
          {activityItem.length !== 0 ? <Item list={activityItem} url="activity" /> :
            <StyledError>데이터가 없습니다.</StyledError>
          }
        </div>
      </Main>
    </Container>
  )
};

const StyledError = styled.div`
  width: 70%;
  height: 7vh;
  background: #d3d3d3;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  line-height: 7vh;
`;

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
  top: 60%;
  left: 10%;
  font-size: 1.2rem
`;

const Main = styled.div`
  margin-left: 2vh;
  margin-right: 2vh;
`;
const Container = styled.div`
  margin-bottom: 10vh;
`;

export default Region;
