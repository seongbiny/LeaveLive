import type { NextPage } from "next";
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
    display: grid;
`;
const Menu = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 2vh;
`;

const MenuTab: NextPage = () => {
    return (
        <>
            <div style={{paddingLeft: '7vw', marginTop: '2vh'}}>주변 편의 시설</div>
            <Menu>
                <Container>
                    <Image src="/cafe.png" alt="cafe" title="cafe" width="70%" height="70%"/>
                    <div>맛집/카페</div>
                </Container>
                <Container>
                    <Image src="/cafe.png" alt="cafe" title="cafe" width="70%" height="70%"/>
                    <div>맛집/카페</div>
                </Container>
                <Container>
                    <Image src="/cafe.png" alt="cafe" title="cafe" width="70%" height="70%"/>
                    <div>맛집/카페</div>
                </Container>
                <Container>
                    <Image src="/cafe.png" alt="cafe" title="cafe" width="70%" height="70%"/>
                    <div>맛집/카페</div>
                </Container>
            </Menu>
        </>
    )
}

export default MenuTab;