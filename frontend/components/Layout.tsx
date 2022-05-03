import LabelBottomNavigation from "./UserNav";
import styled from 'styled-components';
import useIsMobile from "../util/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CeoNav from "./CeoNav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
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
    <Container>
      {isMobile ? (
        <>
          <Main>{children}</Main>
          {isUser ? <LabelBottomNavigation /> : <CeoNav />}
        </>
      ) : (
        <div>모바일로 접속해주세요.</div>
      )}
    </Container>
  );
}
