import styled, { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IContainerProps {
  width?: number | string;
}

export const Container = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: ${({ width }: IContainerProps) => (width ? width : 80)}%;
  /* width: 80%; */
  height: 100%;
  ${flexCenter}
  flex-direction: column;
`;
