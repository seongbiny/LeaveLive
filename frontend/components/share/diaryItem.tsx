import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_IMAGE_URL } from "../../api";
import { Key, useEffect, useState } from "react";
import { getUserDiary } from "../../api/user";
import styled from 'styled-components';
interface IType {
    nickname: string;
    picPath: string;
}

const DiaryItem = ({content, date, diaryId, picPath, userId}: any) => {
    const picPathList = picPath.split(",");
    const [userData, setUserData] = useState<IType | any>({});
    const [btn, setBtn] = useState(0);
    const textLength = content.length;

    useEffect(()=>{
        getUserDiary(
            userId,
            ({ data }: any) => {console.log(data), setUserData(data)},
            (error: Error): any => console.log(error)
        )
    },[])

    return (
        <div style={{marginBottom: '13vh'}}>
            <Carousel showThumbs={false}>
                {picPathList.map((pic: any, idx: Key | null | undefined)=>(
                    <div key={idx}>
                        <img 
                            src={`${BACKEND_IMAGE_URL}/${pic}`}
                            width="100%" height={220}
                        />
                    </div>
                ))}
            </Carousel>
            <div>
                <Profile>
                    <img src={`${BACKEND_IMAGE_URL}/${userData.picPath}`} height={30} width={30} />
                    <div style={{paddingLeft:'2vw', fontSize: '1rem', fontWeight: 'bold'}}>{userData.nickname}</div>
                    <div style={{marginLeft: 'auto', paddingRight: '2vw'}}>{date}</div>
                </Profile>
                <Main>
                    {textLength > 50 ?
                        btn === 0 ?
                            <>
                                <Text>{content}</Text>
                                <div onClick={()=>(setBtn(1))}>더보기</div> 
                            </> :
                            <>
                                <div>{content}</div>
                                <div onClick={()=>(setBtn(0))}>접기</div>
                            </> :
                        <div>{content}</div>
                    }
                </Main>
            </div>
        </div>
    )
};

const Profile = styled.div`
    display: flex;
    // border: 1px solid;
    padding-left: 2vw;
    padding-top: 2vw;
    align-items: center;
`;
const Main = styled.div`
    display: grid;
    padding-left: 5vw;
    padding-right: 5vw;
    margin: 2vh;
    // border: 1px solid;
`;
const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical; 
  word-wrap:break-word; 
  line-height: 1.2em; 
  height: 3.6em;
`;

export default DiaryItem;