import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicDiary,tagDiary  } from "../../api/diary";
import Header from "../../components/Header";
import DiaryItem from "../../components/share/diaryItem";

interface IDiary {
    diaryId: number;
    content: string;
    status: string;
    tag: string;
    date: string;
    picPath: string;
    userId: number;
}

const Share = () => {
    const [diary, setDiary] = useState<Array<IDiary>>([]);
    const [keyword, setKeyword] = useState('');
    const [mode, setMode] = useState('diary');

    useEffect(()=>{
        console.log(mode)
        if(mode==='diary'){
            publicDiary(
                null,
                ({ data }: any) => {console.log(data), setDiary(data), setMode('diary')},
                (error: Error) => console.log(error)
            )
        }
    },[mode])

    useEffect(()=>{
        if(keyword !== '') {
            tagDiary(
                keyword,
                ({ data }: any) => {console.log(data), setDiary(data), setMode('tag')},
                (error: Error) => console.log(error)
            )
        }
    },[keyword])

    const tagFunction = (x: string) => {
        setKeyword(x);
    }

    return (
        <div>
            {mode === "diary" ?
                <Header title="여행스타그램" hide={true} /> :
                <TagTop>
                    <div style={{color: 'white'}}>전체보기</div>
                    <div>태그 모아보기</div>
                    <Btn onClick={()=>{setMode('diary')}}>전체보기</Btn>
                </TagTop>
            }
            {diary.map((item)=>{
                return <DiaryItem 
                            key={item.diaryId} 
                            content={item.content} 
                            date={item.date} 
                            diaryId={item.diaryId} 
                            picPath={item.picPath} 
                            userId={item.userId}
                            tag={item.tag}
                            tagFunction={tagFunction}
                        />
            })}
        </div>
    )
};

const TagTop = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Btn = styled.div`
    margin-right: 3vw;
    height: 6vh;
    width: 20vw;
    text-align: center;
    line-height: 6vh;
    border-radius: 20px;
    background: #00cf95;
    color: white;
    font-size: 0.8rem;
`;
export default Share;