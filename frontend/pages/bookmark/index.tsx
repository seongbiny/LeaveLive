import { useEffect, useState } from "react";
import BnbItem from "../../components/bookmark/bnb";
import ActivityItem from "../../components/bookmark/activity";
import styled from "styled-components";
import { likeBnbList } from "../../api/bnb";
import { likeActivityList } from "../../api/activity";
interface TypeBnb{
  id: number;
  contents: string;
  cooking: string;
  garden: string;
  loc: string;
  name: string;
  picPath: string;
  cnt?: number;
  userId?: number;
  accommodationArticle?: any;
}
interface TypeAct{
  id: number;
  name: string;
  loc: string;
  picPath: string;
  price: number;
}


const Bookmark = () => {
  const [index, setIndex] = useState(0);
  const [bnbList, setBnbList] = useState<Array<TypeBnb>>([]);
  const [actList, setActList] = useState<Array<TypeAct>>([]);
  const [rerender, setRerender] = useState(false);

  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        setBnbList(data.data);
      },
      (error: Error) => console.log(error),
    )
    likeActivityList(
      null,
      (data: any) => {
        setActList(data.data);
      },
      (error: Error) => console.log(error),
    )
  },[rerender])

  const rendering = () => {
    setRerender(!rerender);
    setBnbList([...bnbList])
  }

  return (
    <div>
      <Tabs>
        <TabBox onClick={()=>(setIndex(0))} >숙소</TabBox>
        <TabBox onClick={()=>(setIndex(1))}>액티비티</TabBox>
      </Tabs>
      { index === 0 ?
        bnbList.map((bnb: any)=>{
          return (
              <BnbItem 
                key={bnb.id} 
                name={bnb.accommodationArticle.name} 
                picPath={bnb.accommodationArticle.picPath} 
                id={bnb.accommodationArticle.id}
                like={bnbList}
                rendering={rendering}
              />
          )
        }) :  actList.map((act: any)=>{
          return (
            <ActivityItem
              key={act.id}
              name={act.activity.name}
              picPath={act.activity.picPath}
              id={act.activity.id}
              like={actList}
              rendering={rendering}
            />
          )
        })
        
      }
    </div>
  )
};

const TabBox = styled.div`
  &:hover{
    color: skyblue;
  }
  height: 7vh;
  border-bottom: 1px solid;
  line-height: 7vh;
  text-align: center;
`;

const Tabs = styled.div`
  display: flex;
  div {
    width: 50%;
  }
  margin-bottom: 3vh;
`;

export default Bookmark;