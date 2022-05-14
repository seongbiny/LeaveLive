import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { likeBnb, unlikeBnb } from "../../api/bnb";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BACKEND_IMAGE_URL } from "../../api";
import { useRouter } from "next/router";

const Box = styled.div`
  position: relative;
  display: grid;
  margin-bottom: 2vh;
//   border: 1px solid;
`;
const Text = styled.div`
  z-index: 100;
  position: absolute;
  top: 5%;
  left: 85%;
`;

const BnbItem = (props: any) => {
  const [like, setLike] = useState(false);
  const id = props.id;
  const likeList = props.like;
  const picPath: Array<String> = props.picPath.split(',');
  const router = useRouter();
  const loc = props.loc.split(' ')[0];

  useEffect(()=>{
    {likeList !== undefined ?
      likeList.forEach((value: any)=>{
        if(`${value.accommodationArticle.id}` === String(id)){
          setLike(true);
          return false
        }
      }) : null
    }
  },[likeList]);

  const likeAxios = () => {
    likeBnb(id,
      (response: any) => console.log(response),
      (error: Error) => console.log(error))
    console.log("북마크에 등록되었습니다.");  
  }

  const unlikeAxios = () => {
    unlikeBnb(id,
      (response: any) => (console.log(response)),
      (error: Error) => console.log(error))
    console.log("북마크에서 삭제되었습니다.")
  }

  return(
      <Box>
        <Text>
          {like === false ? 
            <FavoriteBorderIcon 
              fontSize="medium" 
              sx={{color: '#FF385C'}} 
              onClick={() => {setLike(!like); likeAxios();}}
            /> : 
            <FavoriteIcon 
              fontSize="medium" 
              sx={{color: '#FF385C'}} 
              onClick={() => {setLike(!like); unlikeAxios();}}
            />}
        </Text>
        <div onClick={() => {
          router.push(
              {
              pathname: `/reservation/${loc}/bnb/${id}`,
              query: { loc: loc, id: id }
              },
              `/reservation/${loc}/bnb/${id}`
          )}}>
          <Carousel infiniteLoop showThumbs={false}>
            {picPath.map((pic, idx)=>(
              <div 
                key={idx} 
                onClick={()=>(router.push(`bnb/1`))} 
                style={{marginLeft: '5vw', marginRight: '5vw'}} >
                <img 
                  src={`${BACKEND_IMAGE_URL}/${pic}`} 
                  width={350} height={250} 
                  style={{borderRadius: '10px'}} />
              </div>
            ))}
          </Carousel>
          <div style={{marginLeft:'7vw', fontSize: '20px', paddingTop: '1vh'}}>
              {props.name}
          </div>
        </div>
      </Box>
  )
}
export default BnbItem;