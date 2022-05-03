import SimpleBottomNavigation from "./UserNav1";
import styled from "styled-components";
import useIsMobile from "../util/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CeoNav from "./CeoNav";

const Container = styled.div`
  width: 100%;
`;

export default function Layout({ children }: any) {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>(true);
  useEffect(() => {
    if (router.pathname.startsWith("/ceo") && isUser) setIsUser(false);
    if (!router.pathname.startsWith("/ceo") && !isUser) setIsUser(true);
  }, [router]);

  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile ? (
        <>
          <div>{children}</div>
          {isUser ? <SimpleBottomNavigation /> : <CeoNav />}
        </>
      ) : (
        <div>모바일로 접속해주세요.</div>
      )}
    </div>
  );
}
