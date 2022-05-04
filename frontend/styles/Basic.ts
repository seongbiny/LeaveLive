import styled, { css } from "styled-components";

export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IContainerProps {
    width?: number | string
}

export const Container = styled.div`
    ${flexCenter}
    width: ${({width}: IContainerProps) => width ? width : 80}%;
    height: 100%;
    flex-direction: column;
`;