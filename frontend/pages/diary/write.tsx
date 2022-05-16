import React, { useState } from "react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import InputForm from "../../components/diary/form/InputForm";
import Switch from "../../components/diary/form/Switch";
import ImageForm from "../../components/diary/form/ImageForm";
import styled from "styled-components";
import { Container, Wrapper } from "../../styles/Basic";

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
`;

const Write = () => {
  const router = useRouter();
  const date: string = String(router.query.date);
  const [values, setValues] = useState<IValues>({
    date,
    content: "",
    tags: [],
    status: false,
  });
  const [images, setImages] = useState<Array<IImage>>([]);

  return (
    <Container>
      <Header title="일기 작성" />
      <ContentsWrapper>
        <InputForm values={values} setValues={setValues} />
        <Switch values={values} setValues={setValues} />
        <ImageForm images={images} setImages={setImages} />
      </ContentsWrapper>
    </Container>
  );
};

export default Write;
