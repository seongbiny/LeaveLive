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
    activityList(
      region,
      (data: any) => {
        setList(data.data);
        console.log(data.data)
      },
      (error: Error) => console.log(error))
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
