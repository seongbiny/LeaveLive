import LabelBottomNavigation from "./UserNav";
import styled from "styled-components";
import useIsMobile from "../util/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CeoNav from "./CeoNav";
import { flexCenter } from "../styles/Basic";
import { allowedURLs } from "../pages/_app";
import Image from 'next/image';
import Seo from "./Seo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  // ${flexCenter}
`;

export default function Layout({ children }: any) {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [showNav, setShowNav] = useState<boolean>(true);

  useEffect(() => {
    if (allowedURLs.includes(router.pathname)) setShowNav(false);
    else {
      if (router.pathname.startsWith("/ceo")) setIsUser(false);
      else setIsUser(true);

      if (router.pathname.startsWith("/reservation")) setShowNav(false);
      else setShowNav(true);

      if (
        router.pathname.startsWith("/ceo/bnb") &&
        router.pathname.length !== 8
      )
        setShowNav(false);
    }
  }, [router]);

  const isMobile = useIsMobile();
  return (
    <Container>
      <Seo title="리브리브" />
      {isMobile ? (
        <>
          <Main>{children}</Main>
          {showNav ? isUser ? <LabelBottomNavigation /> : <CeoNav /> : null}
        </>
      ) : (
        <Image src='/mobile.png' alt='배경' layout='fill' objectFit='cover' objectPosition='center' />
      )}
    </Container>
  );
}
