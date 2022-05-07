import React from "react";
import { WideButton } from "../../../components/WideButton";

const Login = () => {
  return (
    <div>
      내가 등록한 숙소 목록
      <WideButton href={`/ceo/bnb/create`} text="새 숙소 등록하기" />
    </div>
  );
};

export default Login;
