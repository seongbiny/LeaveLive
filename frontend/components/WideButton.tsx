import { Button } from "@mui/material";
import Link from "next/link";

interface IPropTypes {
  text: string;
  onClick: () => void;
}

export const WideButton = ({ text, onClick }: IPropTypes) => {
  return (
    <Button
      variant="contained"
      style={{ width: "100%" }}
      size="large"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
