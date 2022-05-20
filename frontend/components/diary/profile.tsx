import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import { BoldText, ColoredText } from "../../styles/Text";
import Link from "next/link";
import { BACKEND_IMAGE_URL } from "../../api";
import { useAppSelector } from "../../hooks";

const Container = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  background-color: #f7f8fa;
  height: 12%;
  padding: 1rem 2.5rem;
`;

const ProfileWrapper = styled.div`
  ${flexCenter}
`;

const Image = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: white;
  margin-right: 1.5rem;
`;

const EditLink = styled.a`
  text-decoration: none;

  & > *:hover {
    cursor: pointer;
  }
`;

const Profile = () => {
  const nickname = useAppSelector((state) => state.user.nickname);
  const picPath = useAppSelector((state) => state.user.picPath);

  return (
    <Container>
      <ProfileWrapper>
        <Image
          src={
            picPath.startsWith("http") || picPath === "/profile.png"
              ? picPath
              : `${BACKEND_IMAGE_URL}/${picPath}`
          }
        />
        <BoldText>{nickname}</BoldText>
      </ProfileWrapper>

      <Link href="/diary/profile">
        <EditLink>
          <ColoredText>수정</ColoredText>
        </EditLink>
      </Link>
    </Container>
  );
};

export default Profile;
