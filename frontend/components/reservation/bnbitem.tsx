import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import house from '../../public/house.jpg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from "axios";

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

const BnbItem = () => {
    const [like, setLike] = useState(false);


    const likeAxios = async () => {
      try {
        const request = await axios.post<LikeAxios>(`http://k6c105.p.ssafy.io/api/accommodation/favorite/1`, 
        {accommodation_id: 1},
        {headers: {Authorization: localStorage.getItem("access_token")}});
        console.log(request.data);
        console.log(like);
      } catch (err) {
        console.log(err);
      }
    };
    const unlikeAxios = async () => {
      try {
        const request = await axios.delete(`http://k6c105.p.ssafy.io/api/accommodation/favorite/1`, {
          // headers: {"Authorization": localStorage.getItem("access_token")}
        });
        console.log(request.data);
        console.log(like);
      } catch (err) {
        console.log(err);
      }
    };

    return(
        <Box>
          <Text>
            {like === false ? <StarBorderIcon fontSize="large" sx={{color: 'yellow'}} onClick={() => {setLike(!like); likeAxios();}}/> : <StarIcon fontSize="large" sx={{color: 'yellow'}} onClick={() => {setLike(!like); unlikeAxios();}}/>}
          </Text>
          <Carousel infiniteLoop showThumbs={false}>
              <div>
                  <Image src={house} width={350} height={250} />
              </div>
              <div>
                  <Image src={house} width={350} height={250} />
              </div>
              <div>
                  <Image src={house} width={350} height={250} />
              </div>
              <div>
                  <Image src={house} width={350} height={250} />
              </div>
          </Carousel>
          <div style={{marginLeft:'7vw'}}>어쩌고저쩌고호텔</div>
        </Box>
    )
}
export default BnbItem;