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
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical; 
  word-wrap:break-word; 
  line-height: 1.2em; 
  height: 2.4em;
`;

export default function DayItem({ item }: any) {
  useEffect(()=>{
    console.log(item)
  },[])
  return (
    <>
      <Card style={{ margin: "2vh" }}>
        <CardMedia
          component="img"
          height="150"
          src={`${BACKEND_IMAGE_URL}/${item.picPath.split(",")[0]}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body1" component="div" style={{padding:'10'}}>
            {item.name}
          </Typography> 
          <Typography variant="body2" color="text.secondary" style={{padding:'10'}}>
            <Text>
              {item.loc}
            </Text>
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
          <Button size="medium" variant="contained" style={{width:'90%'}}>바로가기</Button>
        </CardActions>
      </Card>
    </>
  );
}
