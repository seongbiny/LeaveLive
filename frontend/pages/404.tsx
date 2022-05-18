import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export default function NotFound(){
    return (
        <Container>
            <Image src="/404.png" height={200} width={200} />
            <div style={{fontSize: '1.5rem', margin:'3vh'}}>없는 페이지입니다.</div>
        </Container>
    )
}