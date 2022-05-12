import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import house from '../../public/house.jpg';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { likeBnb, unlikeBnb } from "../../api/bnb";
import { BACKEND_IMAGE_URL } from "../../api";
import Router from 'next/router';
import { useAppSelector, useAppDispatch } from "../../util/bookmarkHooks";
import { setIsbookmark } from "../../store/slices/bookmarkSlice";

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
  left: 80%;
`;
interface LikeAxios {
  accommodation_ids: number;
  Authorization: string;
}

const BnbItem = (props: any) => {
  const isBookmark = useAppSelector((state) => state.bookmark.isBookmark);
  const dispatch = useAppDispatch();
  const [like, setLike] = useState(false);
  const id = props.id;
  // const likeList = props.likelist;
  // const [likeList, setLikeList] = useState<Array<Number>>([]);
  // console.log(props.picpath.split(','));
  // console.log(likeNum);
  const picpath: Array<String> = props.picpath.split(',');



  useEffect(()=>{
    // handleLike();
    // console.log(likeList)
    // console.log(likeList);
  },[])

  const likeAxios = useCallback(() => {
    likeBnb(id,
      (response: any) => console.log(response),
      (error: Error) => console.log(error))
    alert("북마크에 등록되었습니다.");  
  }, []);

  const unlikeAxios = useCallback(() => {
    unlikeBnb(id,
      (response: any) => console.log(response),
      (error: Error) => console.log(error))
    alert("북마크에서 삭제되었습니다.")
  }, [])



  return(
      <Box>
        <Text>
          {like === false ? <StarBorderIcon fontSize="large" sx={{color: 'yellow'}} onClick={() => {setLike(!like); likeAxios();}}/> : <StarIcon fontSize="large" sx={{color: 'yellow'}} onClick={() => {setLike(!like); unlikeAxios();}}/>}
        </Text>
        <Carousel infiniteLoop showThumbs={false}>
          {picpath.map((pic, idx)=>(
            <div key={idx} onClick={()=>(Router.push(`bnb/1`))}>
              <img src={`${BACKEND_IMAGE_URL}/${pic}`} width={350} height={250} />
            </div>
          ))}
        </Carousel>
        <div style={{marginLeft:'7vw'}}>{props.name}</div>
      </Box>
  )
}
export default BnbItem;