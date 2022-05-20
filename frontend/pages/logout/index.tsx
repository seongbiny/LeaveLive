import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks";
import { setIsLogin } from "../../store/slices/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    dispatch(setIsLogin(false));
    router.push("/");
  }, []);
};

export default Logout;
