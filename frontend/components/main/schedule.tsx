import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from "./Item";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    day: string;
}

const Container = styled.div`
    // border: 1px solid;
    margin-bottom: 3vh;
    margin-left: 7vw;
    margin-right: 7vw;
`

const Schedule = (props: Props) => {
    const settings = {
    	dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // nextArrow: <NextArrow />
    }
    // 사용할 Carousel의 기본 세팅을 해준다. props로 받아 와야 하기 때문에 객체에 넣어서 받아온다.
    // 더 많은 설정이 있지만, 그것은 직접 코드를 뜯어 보면 쉽게 알 수 있다.
    // 위의 설정은 홈페이지에 나와있는 기본 설정을 한번에 보여줄 갯수만 1개로 바꾼 것이다.

    const {day} = props;

    return (
        <div>
            <div style={{marginBottom:'2vh', marginLeft: '5vw', fontWeight: 'bold'}}>{day} 나의 일정</div>
            <Container>
                <Slider {...settings}>
                    <Card style={{ margin: "3vh" }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image="/card.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography variant="body1" component="div" style={{padding:'10'}}>
                            광주 무등산
                            </Typography> 
                            <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
                            광주 무등산 놀러가요
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                            <Button size="large" variant="contained" style={{width:'90%'}}>바로가기</Button>
                        </CardActions>
                    </Card>
                    <Card style={{ margin: "2vh" }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image="/card.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography variant="body1" component="div" style={{padding:'10'}}>
                            광주 무등산
                            </Typography> 
                            <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
                            광주 무등산 놀러가요
                            </Typography>
                        </CardContent>
                        <CardActions style={{justifyContent: 'center'}}>
                            <Button size="large" variant="contained" style={{width:'90%'}}>바로가기</Button>
                        </CardActions>
                    </Card>
                </Slider>
            </Container>
        </div>
    )
}
export default Schedule;