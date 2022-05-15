import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/user";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";
import { BoldText, ColoredText } from "../../styles/Text";
import Link from "next/link";
import { BACKEND_IMAGE_URL } from "../../api";

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
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: white;
  margin-right: 1.5rem;
`;

const EditLink = styled.a`
  text-decoration: none;
`;

const Profile = () => {
  const [nickname, setNickname] = useState<string>();
  const [picPath, setPicPath] = useState<string>();

  useEffect(() => {
    getUserInfo(
      null,
      ({ data }: any) => {
        console.log(data);
        setNickname(data.nickname);
        setPicPath(data.picPath);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <Container>
      <ProfileWrapper>
        <Image src={`${BACKEND_IMAGE_URL}/${picPath}`} />
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
