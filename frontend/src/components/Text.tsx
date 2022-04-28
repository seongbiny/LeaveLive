import styled from "styled-components/native";

type TextProps = {
  size?: number;
  lineHeight?: number;
};

export const Text = styled.Text`
  font-size: ${({ size }: TextProps) => (size ? size : 16)}px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 30)}px;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const BoldMainText = styled(BoldText)`
  color: ${({ theme }) => theme.main};
`;

export const UnderlineText = styled(Text)`
  text-decoration: underline;
`;
