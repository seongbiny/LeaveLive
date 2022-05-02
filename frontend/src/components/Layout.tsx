import SimpleBottomNavigation from "./UserNav1";
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;

export default function Layout({children}: any){
    return(
        <div>
            <div>{children}</div>
            <SimpleBottomNavigation />
        </div>
    )
}