import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_IMAGE_URL } from "../../api";
import { Key, useEffect } from "react";

const DiaryItem = ({content, date, diaryId, picPath}: any) => {
    const picPathList = picPath.split(",");

    useEffect(()=>{
        console.log(content);
        console.log(date);
        console.log(diaryId);
        console.log(picPathList);
    },[])

    return (
        <div>
            <Carousel showThumbs={false}>
                {picPathList.map((pic: any, idx: Key | null | undefined)=>(
                    <div key={idx}>
                        <img 
                            src={`${BACKEND_IMAGE_URL}/${pic}`}
                            width="100%" height={200}
                        />
                    </div>
                ))}
            </Carousel>
            <div>
                <div>{content}</div>
                <div>{date}</div>
            </div>
        </div>
    )
};
export default DiaryItem;