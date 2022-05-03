import MainSlider from "./MainSlider";
import styled from 'styled-components';

interface Props {
    day: string;
}

const Schedule = (props: Props) => {
    const {day} = props;
    return (
        <>
            <div style={{marginBottom:'2vh', marginLeft: '2vh'}}>{day} 나의 일정</div>
            <MainSlider />
        </>
    )
}
export default Schedule;