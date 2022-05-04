import LabelBottomNavigation from "./UserNav";
import styled from "styled-components";
import useIsMobile from "../util/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CeoNav from "./CeoNav";
import { flexCenter } from "../styles/Basic";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  ${flexCenter}
`;

export default function Layout({ children }: any) {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [showNav, setShowNav] = useState<boolean>(true);

  useEffect(() => {
    if (router.pathname.startsWith("/login")) setShowNav(false);
    else setShowNav(true);

    if (router.pathname.startsWith("/ceo")) setIsUser(false);
    else setIsUser(true);
  }, [router]);

  const isMobile = useIsMobile();
  return (
    <Container>
      {isMobile ? (
        <>
          <Main>{children}</Main>
          {showNav ? isUser ? <LabelBottomNavigation /> : <CeoNav /> : null}
        </>
      ) : (
        <div>모바일로 접속해주세요.</div>
      )}
    </Container>
  );
}
