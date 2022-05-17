import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Container, Wrapper } from "../../styles/Basic";
import Header from "../../components/Header";
import styled from "styled-components";
import { getDiary, deleteDiary } from "../../api/diary";
import Carousel from "../../components/Carousel";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";

interface IDiary {
  id: number;
  content: string;
  tag: string;
  status: string;
  picPath: string;
}

export const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 2rem;
  margin-bottom: 75px;
`;

const DiaryContents = () => {
  const router = useRouter();
  const [date, setDate] = useState<string>(String(router.query.date));
  const [diary, setDiary] = useState<IDiary>({
    id: -1,
    content: "",
    tag: "",
    status: "",
    picPath: "",
  });

  const removeDiary = useCallback(() => {
    if (confirm("일기를 삭제할까요?")) {
      deleteDiary(
        diary.id,
        (response: any) => {
          alert("성공적으로 삭제되었습니다.");
          router.push(`/diary`);
        },
        (error: Error) => console.log(error)
      );
    }
  }, []);

  useEffect(() => {
    getDiary(
      date,
      ({ data }: any) => {
        const value = {
          id: data.diaryId,
          content: data.content,
          tag: data.tag,
          status: data.status,
          picPath: data.picPath,
        };

        if (!value.picPath) value.picPath = "/default.png";
        setDiary(value);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <Container>
      <Header title={date} />
      <Carousel picPath={diary.picPath} />
      <ContentsWrapper>
        <div>
          <Link
            href={{
              pathname: "/diary/update",
              query: { date },
            }}
          >
            <EditRoundedIcon />
          </Link>
          {diary.status === "PUBLIC" ? (
            <LockOpenRoundedIcon />
          ) : (
            <LockRoundedIcon />
          )}
          <CloseRoundedIcon onClick={removeDiary} />
        </div>
        <div>{diary.content}</div>
        <div>{diary.tag}</div>
      </ContentsWrapper>
    </Container>
  );
};

export default DiaryContents;
