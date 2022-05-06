import Image from "next/image";
import house from '../../public/house.jpg';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid;
`

const List = () => {
    return (
        <Container>
            <Image src={house} width='100%' height='100%' />
        </Container>
    )
}
export default List;