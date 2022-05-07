import { Button } from "@mui/material";
import Link from "next/link";

interface IPropTypes {
  href: string;
  text: string;
}

export const WideButton = ({ href, text }: IPropTypes) => {
  return (
    <Link href={href} passHref>
      <Button variant="contained" style={{ width: "100%" }}>
        {text}
      </Button>
    </Link>
  );
};
