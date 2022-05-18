import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { WideButton } from "../../components/WideButton";
import { PhotoCamera } from "@mui/icons-material";
import { flexCenter } from "../../styles/Basic";
import {
  updateUserInfo,
  updateProfileImage,
  deleteUser,
  getUserInfo,
} from "../../api/user";
import { useRouter } from "next/router";
import { BACKEND_IMAGE_URL } from "../../api";
import Header from "../../components/Header";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setUserInfo } from "../../store/slices/userSlice";

const Container = styled.div`
  ${flexCenter};
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  background-color: #f7f8fa;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 100%;
`;

interface IProfileImage {
  url: any;
}

const ProfileImage = styled.div<IProfileImage>`
  margin: 3rem 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const UploadButton = styled.label`
  ${flexCenter}
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: none;

  position: absolute;
  bottom: 5px;
  right: -5px;

  &:hover {
    cursor: pointer;
  }
`;

const UserMenu = styled.div`
  margin: 1rem 0;
  text-align: right;
  color: gray;
  align-self: flex-end;
  font-size: 0.9rem;

  & > span:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;

interface INextImage {
  file: File | null;
  previewURL: String;
}

const Profile = () => {
  const nickname = useAppSelector((state) => state.user.nickname);
  const [nextNickname, setNextNickname] = useState<String>("");
  const picPath = useAppSelector((state) => state.user.picPath);
  const [nextImage, setNextImage] = useState<INextImage>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNextNickname(nickname);
    setNextImage({
      file: null,
      previewURL: picPath.startsWith("http")
        ? picPath
        : `${BACKEND_IMAGE_URL}/${picPath}`,
    });
  }, [nickname, picPath]);

  const handleChange = useCallback(({ target: { value } }: any) => {
    setNextNickname(value);
  }, []);

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      console.log(files);
      if (!files || files!.length < 1) return;

      const imageURL = URL.createObjectURL(files[0]);
      setNextImage({ file: files[0], previewURL: imageURL });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    // 1. 유저 정보 수정
    if (nickname.trim() !== nextNickname.trim()) {
      updateUserInfo(
        { nickname: nextNickname.trim() },
        (response: any) => {
          // console.log(response);
        },
        (error: Error) => console.log(error)
      );
    }

    // 2. 유저 이미지 수정
    if (nextImage?.file && picPath !== nextImage?.previewURL && nextImage) {
      const form = new FormData();
      form.append("image", nextImage.file);
      updateProfileImage(
        form,
        (response: any) => {
          // console.log(response);
        },
        (error: Error) => console.log(error)
      );
    }

    alert("정보가 수정되었습니다.");

    // 3. 변경된 정보를 redux에 갱신 후 router push
    getUserInfo(
      null,
      ({ data: { nickname, picPath, type } }: any) => {
        dispatch(setUserInfo({ nickname, picPath, type }));
      },
      (error: Error) => console.log(error)
    );

    router.push("/diary");
  }, [router, nickname, nextNickname, picPath, nextImage]);

  const handleLogout = useCallback(() => {
    if (confirm("로그아웃 하시겠습니까?")) {
      router.push("/logout");
    }
  }, [router]);

  const handleDeleteUser = useCallback(() => {
    if (confirm("리브리브를 탈퇴할까요?")) {
      deleteUser(
        null,
        (response: any) => {
          router.push("/logout");
        },
        (error: Error) => console.log(error)
      );
    }
  }, [router]);

  return (
    <Container>
      <Header title="내 정보 수정" />
      <Wrapper>
        <ProfileImage url={nextImage?.previewURL}>
          <UploadButton htmlFor="image">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            <PhotoCamera color="primary" />
          </UploadButton>
        </ProfileImage>
        <TextField
          label="이름"
          id="name"
          style={{
            width: "100%",
            marginBottom: "1rem",
            backgroundColor: "white",
          }}
          placeholder="이름을 적어주세요."
          value={nextNickname}
          onChange={handleChange}
        />
        <WideButton text="수정하기" onClick={handleSubmit} />
        <UserMenu>
          <span onClick={handleLogout} style={{ marginRight: "1rem" }}>
            로그아웃
          </span>
          <span onClick={handleDeleteUser}>회원탈퇴</span>
        </UserMenu>
      </Wrapper>
    </Container>
  );
};

export default Profile;
