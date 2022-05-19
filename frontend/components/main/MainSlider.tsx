import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { BACKEND_IMAGE_URL } from '../../api';
import { useRouter } from "next/router";

const Container = styled.div`
    // border: 1px solid;
    margin-bottom: 7vh;
    margin-left: 3vh;
    margin-right: 3vh;
`

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical; 
  word-wrap:break-word; 
  line-height: 1.2em; 
  height: 1.2em;
  display: inline-block;
  width: 99%;
`;

const Schedule = ({ act, bnb }: any) => {
    const router = useRouter();
    const settings = {
    	dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    // 사용할 Carousel의 기본 세팅을 해준다. props로 받아 와야 하기 때문에 객체에 넣어서 받아온다.
    // 더 많은 설정이 있지만, 그것은 직접 코드를 뜯어 보면 쉽게 알 수 있다.
    // 위의 설정은 홈페이지에 나와있는 기본 설정을 한번에 보여줄 갯수만 1개로 바꾼 것이다.
    
    return (
        <Container>
            <Slider {...settings}>
                {act.length !== 0 ?
                    act.map((item: any)=>{
                        return <Card style={{ margin: "1h" }} key={item.id}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={`${BACKEND_IMAGE_URL}/${item.activity.picPath.split(",")[0]}`}
                                alt="썸네일"
                            />
                            <CardContent>
                                <Typography variant="body1" component="div" style={{padding:'10'}}>
                                    <Text>{item.activity.name}</Text>
                                </Typography> 
                                <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
                                    <Text>{item.activity.loc}</Text>
                                </Typography>
                            </CardContent>
                        </Card>
                    }) : null   
                }
                {bnb.length !== 0 ?
                    bnb.map((item: any)=>{
                        return <Card style={{ margin: "1vh" }} key={item.id}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={`${BACKEND_IMAGE_URL}/${item.accommodationArticle.picPath.split(",")[0]}`}
                                alt="썸네일"
                            />
                            <CardContent>
                                <Typography variant="body1" component="div" style={{padding:'10'}}>
                                    <Text>{item.accommodationArticle.name}</Text>
                                </Typography> 
                                <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
                                    <Text>{item.accommodationArticle.loc}</Text>
                                </Typography>
                            </CardContent>
                        </Card>
                    }) : null
                }
            </Slider>
        </Container>
    )
}
export default Schedule;
