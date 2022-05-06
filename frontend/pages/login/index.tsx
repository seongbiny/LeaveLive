import React, { useState, useEffect } from "react";
import UserLogin from "../../components/login/UserLogin";
import CeoLogin from "../../components/login/CeoLogin";
import { Container } from "../../styles/Basic";
import { useRouter } from "next/router";

const Login = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const type = router.query.type ?? "user";
    if (type !== "user") setIsUser(false);
  }, [router]);

  return (
    <Container width={65}>
      {isUser ? (
        <UserLogin setIsUser={setIsUser} />
      ) : (
        <CeoLogin setIsUser={setIsUser} />
      )}
    </Container>
  );
};

export default Login;
