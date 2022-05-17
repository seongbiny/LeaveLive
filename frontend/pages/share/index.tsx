import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicDiary } from "../../api/diary";
import Header from "../../components/Header";
import Item from "../../components/share/diaryItem";


interface IDiary {
    diaryId: number;
    content: string;
    status: string;
    tag: string;
    date: string;
    picPath: string;
}

const Share = () => {
    const [diary, setDiary] = useState<Array<IDiary>>([]);

    useEffect(()=>{
        publicDiary(
            null,
            ({ data }: any) => {console.log(data), setDiary(data)},
            (error: Error) => console.log(error)
        )
    },[])

    return (
        <div>
            <Header title="여행스타그램" hide={true} />
            {diary.map((item)=>{
                return <Item key={item.diaryId} content={item.content} date={item.date} diaryId={item.diaryId} picPath={item.picPath} />
            })}
        </div>
    )
}
export default Share;