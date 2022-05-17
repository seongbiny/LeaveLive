import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Wrapper } from "../../styles/Basic";
import Header from "../../components/Header";
import styled from "styled-components";
import { getDiary } from "../../api/diary";
import Tag from "../../components/diary/form/Tag";
import Carousel from "../../components/Carousel";

interface IDiary {
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
    content: "",
    tag: "",
    status: "",
    picPath: "",
  });

  useEffect(() => {
    getDiary(
      date,
      ({ data }: any) => {
        setDiary({
          content: data.content,
          tag: data.tag,
          status: data.status,
          picPath: data.picPath,
        });
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <Container>
      <Header title={date} />
      <Carousel picPath={diary.picPath} />
      <ContentsWrapper>
        {date}
        <div>{diary.content}</div>
      </ContentsWrapper>
    </Container>
  );
};

export default DiaryContents;
