import { useState } from "react";
import BnbList from "../../components/bookmark/bnb";
import ActivityList from "../../components/bookmark/activity";
import styled from "styled-components";

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

const Bookmark = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Tabs>
        <TabBox onClick={()=>(setIndex(0))} >숙소</TabBox>
        <TabBox onClick={()=>(setIndex(1))}>액티비티</TabBox>
      </Tabs>
      {index === 0 && <BnbList />}
      {index === 1 && <ActivityList />}
    </div>
  )
};
export default Bookmark;