import SimpleBottomNavigation from "./UserNav";
import styled from 'styled-components';
import useIsMobile from "../util/hooks";

const Container = styled.div`
    width: 100%;
`;

export default function Layout({children}: any){
    const isMobile = useIsMobile();
    return(
        <div>
            {isMobile ?
                <>
                    <div>{children}</div>
                    <SimpleBottomNavigation />
                </> : <div>모바일로 접속해주세요.</div>
            }
        </div>
    )
}