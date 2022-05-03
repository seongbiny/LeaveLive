import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setIsLogin } from "../../store/slices/userSlice";

const Login = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const dispatch = useAppDispatch();
  dispatch(setIsLogin(true));
  return <div>테스트 {isLogin ? "true" : "false"}</div>;
};

export default Login;
