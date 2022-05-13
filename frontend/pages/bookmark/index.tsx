import { useEffect, useState } from "react";
import BnbItem from "../../components/bookmark/bnb";
import ActivityList from "../../components/bookmark/activity";
import styled, { AnyStyledComponent } from "styled-components";
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
  const [bnblist, setBnblist] = useState<Object[]>([]);


  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        // const arr: any = [];
        // console.log()
        // data.data.forEach((value: any)=>{
        //   arr.concat(value.accommodationArticle)
        //   console.log(value.accommodationArticle);
        //   console.log(arr)

        //   // if(!(value.accommodationArticle in list)){
        //   // }
        // })

        // data.data.forEach((bnb: any)=>{
        //   // console.log(data.data);
        //   // if(list.length === 0){
        //   //   setList([bnb.accommodationArticle]);  
        //   // } else {
        //   // }
        // });
        setList(data.data);
      },
      (error: Error) => console.log(error),
    )
    // console.log(list);
  },[])
  console.log(list)
  return (
    <div>
      <Tabs>
        <TabBox onClick={()=>(setIndex(0))} >숙소</TabBox>
        <TabBox onClick={()=>(setIndex(1))}>액티비티</TabBox>
      </Tabs>
      { index === 0 ?
        list.map((bnb: any)=>{
          return (
            <BnbItem key={bnb.id} name={bnb.accommodationArticle.name} />
            // <h1>{bnb.accommodationArticle.name}</h1>
          )
        }) :
       <ActivityList /> }
      {/* {list.map((bnb)=>{console.log(bnb.accommodationArticle.id, bnb.accommodationArticle.name)})} */}
    </div>
  )
};
export default Bookmark;