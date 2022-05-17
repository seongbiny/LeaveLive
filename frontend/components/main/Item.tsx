import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BACKEND_IMAGE_URL } from '../../api';
import styled from 'styled-components';

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical; 
  word-wrap:break-word; 
  line-height: 1.2em; 
  height: 3.6em;
`;

export default function Item({ diary, onClick }: any) {
  useEffect(()=>{
    console.log(`${BACKEND_IMAGE_URL}/${diary.picPath.split(",")[0]}`)
  },[])
  return (
    <>
      {/* <img src={`${BACKEND_IMAGE_URL}/${diary.picPath.split(",")[0]}`} height={100} width={100} /> */}
      <Card style={{ margin: "2vh" }}>
        <CardMedia
          component="img"
          height="150"
          src={`${BACKEND_IMAGE_URL}/${diary.picPath.split(",")[0]}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body1" component="div" style={{padding:'10'}}>
            {diary.date}
          </Typography> 
          <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
            <Text>
              {diary.content}
            </Text>
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
          <Button size="large" variant="contained" style={{width:'90%'}} onClick={onClick}>바로가기</Button>
        </CardActions>
      </Card>
    </>
  );
}
