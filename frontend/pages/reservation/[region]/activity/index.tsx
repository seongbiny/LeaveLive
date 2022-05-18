import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ActivityItem from '../../../../components/reservation/activityItem';
import Header from "../../../../components/Header";
import { activityList, likeActivityList } from '../../../../api/activity';

interface TypeAct{
  id: number,
  contents: string,
  loc: string,
  name: string,
  picContents: string,
  picPath: string,
  price: number
}

const ActivityList = () => {
  const router = useRouter();
  const region = router.query.region;
  const [list, setList] = useState<Array<TypeAct>>([]);
  const [like, setLike] = useState<number[]>([]);

  useEffect(() => {
    likeActivityList(
      null,
      (data: any) => {
        setLike(data.data);
      },
      (error: Error) => console.log(error)
    );
    console.log({router})
  },[])

  useEffect(() => {
    if (region === '제주도') {
      activityList(
        '제주특별자치도',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='강원도') {
      activityList(
        '강원',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라남도') {
      activityList(
        '전남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라북도') {
      activityList(
        '전북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상남도') {
      activityList(
        '경남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상북도') {
      activityList(
        '경북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청남도') {
      activityList(
        '충남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청북도') {
      activityList(
        '충북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else {
      activityList(
        region,
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
  },[region])

  return (
    <div>
      <Header title={String(region)} hide={false} />
      <div>
        {list?.map((act) => (
          <ActivityItem
            key={act.id}
            name={act.name}
            picPath={act.picPath}
            actId={act.id}
            picContent={act.picContents}
            price={act.price}
            like={like}
            loc={act.loc}
          />
        ))}
      </div>
    </div>
  )
};

export default ActivityList;
