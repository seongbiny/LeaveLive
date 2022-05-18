import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_IMAGE_URL } from '../../api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { unlikeActivity } from '../../api/activity';
import { useRouter } from "next/router";

const Box = styled.div`
  position: relative;
  display: grid;
  margin-bottom: 3vh;
`;
const Text = styled.div`
  z-index: 100;
  position: absolute;
  top: 5%;
  left: 85%;
`;

const ActivityList = (props: any) => {
    const router = useRouter();
    const picPath: Array<String> = props.picPath.split(',');
    const id = props.id;
    const loc = props.loc.split(' ');

    async function unlikeAxios(){
        await unlikeActivity(id,
            (response: any) => console.log(response),
            (error: Error) => console.log(error)
        );
        await alert("북마크를 취소하겠습니까?");
        await render();
    };

    const render = ()=> {
        props.rendering(!render);
    };
    
    return (
        <Box>
            <Text>
                <FavoriteIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={()=>{unlikeAxios()}} />
            </Text>
            <div>
                <Carousel infiniteLoop showThumbs={false} showStatus={false} showArrows={false}>
                    {picPath.map((pic, idx)=>(
                        <div key={idx} style={{marginLeft: '5.5vw', marginRight: '5.5vw'}}>
                            <img src={`${BACKEND_IMAGE_URL}/${pic}`} style={{borderRadius: '10px'}} width={350} height={230} />
                        </div>
                    ))}
                </Carousel>
                <div style={{marginLeft:'7vw', marginRight:'7vw', fontSize: '1rem', paddingTop: '1vh', cursor: 'pointer'}} onClick={props.onClick}>{props.name}</div>
            </div>
        </Box>
    )
};

export default ActivityList;