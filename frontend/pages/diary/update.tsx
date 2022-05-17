import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Container, Wrapper } from "../../styles/Basic";
import { IValues, IImage } from "./write";
import { InputForm, Switch, ImageForm } from "../../components/diary/form";
import { WideButton } from "../../components/WideButton";

export const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 2rem;
`;

const Update = () => {
  const router = useRouter();
  const [values, setValues] = useState<IValues>({
    date: "",
    content: "",
    tags: [],
    status: false,
  });
  const [images, setImages] = useState<Array<IImage>>([]);
  const onClick = useCallback(() => {}, []);

  return (
    <Container>
      <Header title="일기 수정" />
      <ContentsWrapper>
        <InputForm values={values} setValues={setValues} />
        <Switch values={values} setValues={setValues} />
        <ImageForm images={images} setImages={setImages} />
        <WideButton onClick={onClick} text="일기 수정하기" />
      </ContentsWrapper>
    </Container>
  );
};

export default Update;
