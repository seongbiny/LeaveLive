import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Item() {
  return (
    <Card style={{ margin: "2vh" }}>
      <CardMedia
        component="img"
        height="150"
        image="/card.jpg"
        alt="green iguana"
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          광주 무등산
        </Typography> */}
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
  );
}
