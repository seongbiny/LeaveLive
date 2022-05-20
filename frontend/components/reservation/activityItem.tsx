import Image from "next/image";
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { likeActivity, unlikeActivity } from "../../api/activity";
import { BACKEND_IMAGE_URL } from "../../api";

const Box = styled.div`
    display: flex;
    width: 100%;
    padding: 3vw;
    cursor: pointer;
`;
const Main = styled.div`
    display: flex;
    width: 90%
`;


const ActivityItem = (props: any) => {
    const [like, setLike] = useState(false);
    const id = props.actId;
    const picPath: Array<String> = props.picPath.split(',');
    const picContent = props.picContent;
    const name = props.name;
    const price = props.price;
    const likeList = props.like;
    const router = useRouter();
    const loc = props.loc.split(' ')[0]

    useEffect(()=>{
        {likeList !== undefined ?
            likeList.forEach((value: any)=>{
                if(`${value.activity.id}` === String(id)){
                    setLike(true);
                    return false
                }
            }) : null
        }
    }, [likeList])

    const likeAxios = () => {
        likeActivity(id,
            (response: any) => console.log(response),
            (error: Error) => console.log(error))
        console.log("북마크에 등록되었습니다.")
    }
    const unlikeAxios = () => {
        unlikeActivity(id,
          (response: any) => (console.log(response)),
          (error: Error) => console.log(error))
        console.log("북마크에서 삭제되었습니다.")
      }

    return (
        <>
            <Box>
                <Main onClick={() => {
                    router.push(
                        {
                        pathname: `/reservation/${loc}/activity/${id}`,
                        query: { loc: loc, id: id }
                        },
                        `/reservation/${loc}/activity/${id}`
                    )}}
                >
                    <img src={`${BACKEND_IMAGE_URL}/${picPath[0]}`} height={100} width={100} style={{borderRadius: '10px', objectFit: 'cover'}} />
                    <div style={{width: '100%', display: 'grid', paddingLeft: '5vw', alignContent: 'space-between'}}>
                        <div style={{fontSize:'1rem',  paddingRight:'5vw'}}>{name}</div>
                        <div style={{textAlign:'right', fontWeight:'bold', fontSize:'1.1rem'}}>{price}원</div>
                    </div>
                </Main>
                {like === false ? 
                <FavoriteBorderIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={() => {setLike(!like); likeAxios();}}/> 
                : <FavoriteIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={() => {setLike(!like); unlikeAxios();}}/>}
            </Box>
            <hr />
        </>
    )
}
export default ActivityItem;