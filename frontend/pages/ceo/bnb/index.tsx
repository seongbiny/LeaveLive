import React from "react";
import { WideButton } from "../../../components/WideButton";
import Link from "next/link";
const Login = () => {
  return (
    <div>
      내가 등록한 숙소 목록
      <Link href={`/ceo/bnb/create`} passHref>
        <WideButton onClick={() => {}} text="새 숙소 등록하기" />
      </Link>
    </div>
  );
};

export default Login;
