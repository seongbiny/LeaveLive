import styled from 'styled-components';
import { useState, useEffect } from "react";
import Router from 'next/router';
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
  const region = Router.query.region;
  const [list, setList] = useState<Array<TypeAct>>([]);
  const [like, setLike] = useState<number[]>([]);

  useEffect(() => {
    likeActivityList(
      null,
      (data: any) => {
        // console.log(data.data);
        setLike(data.data);
      },
      (error: Error) => console.log(error)
    )
  },[])

  useEffect(() => {
    activityList(
      region,
      (data: any) => {
        // console.log(data.data);
        setList(data.data);
      },
      (error: Error) => console.log(error))
  },[region])

  return (
    <div>
      <Header title={String(region)} hide={false} />
      <div>
        {list.map((act) => {
          return like.length !== 0 ? (
            <div key={act.id}>
              <ActivityItem
                name={act.name}
                picPath={act.picPath}
                actid={act.id}
                picContent={act.picContents}
                price={act.price}
                like={like}
              />
            </div>
          ) : (
            <div key={act.id}>
              <ActivityItem
                name={act.name}
                picPath={act.picPath}
                actid={act.id}
                picContent={act.picContents}
                price={act.price}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default ActivityList;
