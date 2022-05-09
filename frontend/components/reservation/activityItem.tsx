import Image from "next/image";
import styled from 'styled-components';

const Box = styled.div`
    // border: 1px solid;
    display: flex;
    width: 100%;
    padding: 1vh;
`;

const ActivityItem = () => {
    return (
        <>
            <Box>
                <Image src="/land.PNG" height={150} width={150} />
                <div style={{width: '100%', display: 'grid', paddingLeft: '2vw'}}>
                    <div>[경인 용인] 에버랜드</div>
                    <div style={{textAlign:'right'}}>50,000원</div>
                </div>
            </Box>
            <hr />
        </>
    )
}
export default ActivityItem;