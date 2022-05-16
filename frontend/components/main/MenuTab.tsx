import type { NextPage } from "next";
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    text-align: center;
    font-size: 0.8rem;
`;
const Menu = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 2vh;
    margin-bottom: 3vh;
`;

const MenuTab: NextPage = () => {
    const router = useRouter();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const tag = ['CE7', 'HP8', 'CS2', 'BK9']

      // 현재 위치 경도 위도 얻는 함수
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        });
        // console.log(latitude, longitude)
    },[])

    const handleClick = (para: string): void => {
        router.push({
            pathname: '/main/map',
            query: {tag: para, latitude: latitude, longitude: longitude},
        }, '/main/map')
    }

    return (
        <>
            <div style={{paddingLeft: '7vw', marginTop: '2vh'}}>주변 편의 시설</div>
            <Menu>
                <Container onClick={()=>(handleClick(tag[0]))}>
                    <Image src="/cafe.png" alt="cafe" title="cafe" width={65} height={65}/>
                    <div style={{paddingTop: '1vh'}}>카페</div>
                </Container>
                <Container onClick={()=>(handleClick(tag[1]))}>
                    <Image src="/hospital.png" alt="hospital" title="hospital" width={65} height={65}/>
                    <div style={{paddingTop: '1vh'}}>병원</div>
                </Container>
                <Container onClick={()=>(handleClick(tag[2]))}>
                    <Image src="/convenience.png" alt="convenience" title="convenience" width={65} height={65}/>
                    <div style={{paddingTop: '1vh'}}>편의점</div>
                </Container>
                <Container onClick={()=>(handleClick(tag[3]))}> 
                    <Image src="/bank.png" alt="bank" title="bank" width={65} height={65}/>
                    <div style={{paddingTop: '1vh'}}>은행</div>
                </Container>
            </Menu>
        </>
    )
}

export default MenuTab;