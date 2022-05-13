import Image from "next/image";
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { likeActivity, unlikeActivity } from "../../api/activity";
import { BACKEND_IMAGE_URL } from "../../api";

const Box = styled.div`
    // border: 1px solid;
    display: flex;
    width: 100%;
    padding: 1vh;
`;


const ActivityItem = (props: any) => {
    const [like, setLike] = useState(false);
    const actid = props.actid;
    const picPath: Array<String> = props.picPath.split(',');
    const picContent = props.picContent;
    const name = props.name;
    const price = props.price;
    console.log(picPath)

    const likeAxios = () => {
        likeActivity(actid,
            (response: any) => console.log(response),
            (error: Error) => console.log(error))
        console.log("북마크에 등록되었습니다.")
    }
    const unlikeAxios = () => {
        unlikeActivity(actid,
          (response: any) => (console.log(Response)),
          (error: Error) => console.log(error))
        console.log("북마크에서 삭제되었습니다.")
      }

    return (
        <>
            <Box>
                <img src={`${BACKEND_IMAGE_URL}/${picPath[0]}`} height={150} width={150} style={{borderRadius: '10px'}} />
                <div style={{width: '100%', display: 'grid', paddingLeft: '2vw', alignContent: 'space-between'}}>
                    <div style={{fontSize:'20px'}}>{name}</div>
                    <div style={{textAlign:'right', fontWeight:'bold', fontSize:'18px'}}>{price}원</div>
                </div>
                {like === false ? 
                <FavoriteBorderIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={() => {setLike(!like); likeAxios();}}/> 
                : <FavoriteIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={() => {setLike(!like); unlikeAxios();}}/>}
            </Box>
            <hr />
        </>
    )
}
export default ActivityItem;