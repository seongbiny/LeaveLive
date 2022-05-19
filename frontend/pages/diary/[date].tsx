import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Container, Wrapper } from "../../styles/Basic";
import Header from "../../components/Header";
import styled from "styled-components";
import { getDiary, deleteDiary, updateDiary } from "../../api/diary";
import Carousel from "../../components/Carousel";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { flexCenter } from "../../styles/Basic";
import Tag from "../../components/diary/Tag";
import Seo from "../../components/Seo";
interface IDiary {
  id: number;
  content: string;
  tags: Array<string>;
  status: string;
  picPath: string;
}

export const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 2rem;
  margin-bottom: 75px;
`;

const MenuContainer = styled.div`
  ${flexCenter}
  width: 100%;
  margin-bottom: 1rem;
`;

const MenuIconContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex: 1;

  & > *:hover {
    cursor: pointer;
  }
`;

const DiaryContentContainer = styled.div`
  width: 100%;
  line-height: 2rem;
  padding: 0.6rem 0 0.7rem 0;
`;

const TagContainer = styled.div`
  ${flexCenter}
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  margin: 1rem 0;
`;

const DiaryContents = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(String(router.query.date));
  const [diary, setDiary] = useState<IDiary>({
    id: -1,
    content: "",
    tags: [],
    status: "PUBLIC",
    picPath: "",
  });

  const changeDiaryStatus = useCallback(() => {
    const form = new FormData();
    const diaryRequest = {
      date,
      content: diary.content,
      tag: diary.tags.join(","),
      status: diary.status === "PRIVATE" ? "PUBLIC" : "PRIVATE",
    };

    form.append(
      "diaryRequest",
      new Blob([JSON.stringify(diaryRequest)], {
        type: "application/json",
      })
    );
    form.append("images", new Blob());

    updateDiary(
      diary.id,
      form,
      ({ data }: any) => {
        const value = {
          id: data.diaryId,
          content: data.content,
          tags: data.tag.split(","),
          status: data.status,
          picPath: data.picPath,
        };

        if (!value.picPath) value.picPath = "/default.png";
        setDiary(value);
      },
      (error: Error) => console.log(error)
    );
  }, [diary]);

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
  }, [diary]);

  useEffect(() => {
    const dateArr = String(router.query.date).split("-");
    setTitle(`${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`);

    getDiary(
      date,
      ({ data }: any) => {
        const value = {
          id: data.diaryId,
          content: data.content,
          tags: data.tag.split(","),
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
      <Seo title="다이어리" />
      <Header title={title} />
      <Carousel picPath={diary.picPath} />
      <ContentsWrapper>
        <MenuContainer>
          <div style={{ flex: 2.3 }}>
            {String(router.query.date).split("-").join(".")}
          </div>
          <MenuIconContainer>
            <Link
              href={{
                pathname: "/diary/update",
                query: { date },
              }}
            >
              <EditRoundedIcon />
            </Link>
            {diary.status === "PUBLIC" ? (
              <LockOpenRoundedIcon onClick={changeDiaryStatus} />
            ) : (
              <LockRoundedIcon onClick={changeDiaryStatus} />
            )}
            <CloseRoundedIcon onClick={removeDiary} />
          </MenuIconContainer>
        </MenuContainer>

        <DiaryContentContainer>
          {diary.content.split("\n").map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </DiaryContentContainer>
        <TagContainer>
          {diary.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </TagContainer>
      </ContentsWrapper>
    </Container>
  );
};

export default DiaryContents;
