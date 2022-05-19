import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import styled from "styled-components";
import { InputForm, Switch, ImageForm } from "../../components/diary/form";
import { Container, Wrapper } from "../../styles/Basic";
import { WideButton } from "../../components/WideButton";
import { writeDiary } from "../../api/diary";
import Seo from '../../components/Seo';
export interface IValues {
  date: string;
  content: string;
  tags: Array<string>;
  status: boolean;
}

export interface IImage {
  file: File;
  previewURL: string;
}

export const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 2rem;
  margin-bottom: 75px;
`;

const Write = () => {
  const router = useRouter();

  useEffect(() => {
    setValues({ ...values, date: String(router.query.date) });
  }, []);

  const [values, setValues] = useState<IValues>({
    date: "",
    content: "",
    tags: [],
    status: false,
  });
  const [images, setImages] = useState<Array<IImage>>([]);
  const onClick = useCallback(() => {
    const form = new FormData();
    const diaryRequest = {
      content: values.content,
      status: values.status ? "PUBLIC" : "PRIVATE",
      tag: values.tags.join(","),
      date: values.date,
    };

    console.log(images);
    form.append(
      "diaryRequest",
      new Blob([JSON.stringify(diaryRequest)], {
        type: "application/json",
      })
    );

    if (images.length === 0) {
      form.append("images", new Blob());
    } else {
      images?.map((image) => form.append("images", image.file));
    }

    writeDiary(
      form,
      (response: any) => {
        router.push(`/diary/${values.date}`);
        // console.log(response);
      },
      (error: Error) => console.log(error)
    );
  }, [values, images]);

  return (
    <Container>
      <Seo title="일기작성" />
      <Header title="일기 작성" />
      <ContentsWrapper>
        <InputForm values={values} setValues={setValues} />
        <Switch values={values} setValues={setValues} />
        <ImageForm images={images} setImages={setImages} />
        <WideButton onClick={onClick} text="일기 작성하기" />
      </ContentsWrapper>
    </Container>
  );
};

export default Write;
