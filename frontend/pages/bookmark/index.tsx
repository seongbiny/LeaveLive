import { useEffect, useState } from "react";
import BnbItem from "../../components/bookmark/bnb";
import ActivityList from "../../components/bookmark/activity";
import styled from "styled-components";
import { likeBnbList } from "../../api/bnb";

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


const Bookmark = () => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useState<Array<TypeBnb>>([]);
  const [rerender, setRerender] = useState(false);

  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        setList(data.data);
      },
      (error: Error) => console.log(error),
    )
  },[rerender])

  const rendering = () => {
    setRerender(!rerender);
    setList([...list])
    console.log(list);
  }

  return (
    <div>
      <Tabs>
        <TabBox onClick={()=>(setIndex(0))} >숙소</TabBox>
        <TabBox onClick={()=>(setIndex(1))}>액티비티</TabBox>
      </Tabs>
      { index === 0 ?
        list.map((bnb: any)=>{
          return (
              <BnbItem 
                key={bnb.id} 
                name={bnb.accommodationArticle.name} 
                picPath={bnb.accommodationArticle.picPath} 
                id={bnb.accommodationArticle.id}
                like={list}
                rendering={rendering}
              />
          )
        }) :
       <ActivityList /> }
    </div>
  )
};
export default Bookmark;