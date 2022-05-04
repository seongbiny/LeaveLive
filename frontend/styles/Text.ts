// import styled from "styled-components";
import { styled } from "@mui/system";

export const ColoredText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

export const BoldText = styled("span")({
  fontWeight: "bold",
});

export const UnderlineText = styled("span")({
  textDecoration: "underline",
});
