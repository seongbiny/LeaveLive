import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BACKEND_IMAGE_URL } from "../../api";
import { useRouter } from "next/router";

const Box = styled.div`
  position: relative;
  display: grid;
  margin-bottom: 2vh;
//   border: 1px solid;
`;

const Item = ({ list, url }: any) => {
  const id = list[0].id;
  const picPath: Array<String> = list[0].picPath.split(',');
  const name = list[0].name;
  const router = useRouter();
  const region = router.query.region;

  useEffect(()=>{
    console.log(list)
  },[])

  return(
      <Box>
          <Carousel infiniteLoop showThumbs={false}>
            {picPath.map((pic, idx)=>(
              <div 
                key={idx} 
                style={{marginLeft: '5vw', marginRight: '5vw'}}
                onClick={()=>{router.push(`/reservation/${region}/${url}/${id}`)}}
              >
                    
                <img 
                  src={`${BACKEND_IMAGE_URL}/${pic}`} 
                  width={350} height={250} 
                  style={{borderRadius: '10px'}} />
              </div>
            ))}
          </Carousel>
          <div style={{marginLeft:'7vw', fontSize: '20px', paddingTop: '1vh'}}>
              {name}
          </div>
      </Box>
  )
}
export default Item;