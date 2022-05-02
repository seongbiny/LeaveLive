import SimpleBottomNavigation from "./UserNav1";
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
`;

export default function Layout({children}: any){
    return(
        <Container>
            <div>{children}</div>
            <SimpleBottomNavigation />
        </Container>
    )
}