import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Container, Wrapper } from "../../styles/Basic";
import { IValues, IImage } from "./write";
import { InputForm, Switch, ImageForm } from "../../components/diary/form";
import { WideButton } from "../../components/WideButton";
import { getDiary, updateDiary } from "../../api/diary";
import { BACKEND_IMAGE_URL } from "../../api";

export const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 2rem;
  margin-bottom: 75px;
`;

const Update = () => {
  const router = useRouter();
  const [diaryId, setDiaryId] = useState<number>(0);
  const [values, setValues] = useState<IValues>({
    date: "",
    content: "",
    tags: [],
    status: false,
  });
  const [images, setImages] = useState<Array<IImage>>([]);

  useEffect(() => {
    const date = router.query.date;
    getDiary(
      date,
      ({ data }: any) => {
        setValues({
          date: data.date,
          content: data.content,
          tags: data.tag.split(","),
          status: data.status === "PUBLIC" ? true : false,
        });

        const image: Array<IImage> = [];
        data?.picPath.split(",").map((path: any, index: number) => {
          image.push({
            file: new File([""], ""),
            previewURL: `${BACKEND_IMAGE_URL}/${path}`,
          });
        });

        setImages(image);
        setDiaryId(data.diaryId);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const onClick = useCallback(() => {
    const form = new FormData();
    const diaryRequest = {
      date: values.date,
      content: values.content,
      tag: values.tags.join(","),
      status: values.status ? "PUBLIC" : "PRIVATE",
    };

    form.append(
      "diaryRequest",
      new Blob([JSON.stringify(diaryRequest)], {
        type: "application/json",
      })
    );

    if (images.length > 0 && !images[0].previewURL.startsWith("http")) {
      images?.map((image) => form.append("images", image.file));
    } else {
      form.append("images", new Blob());
    }
    updateDiary(
      diaryId,
      form,
      (response: any) => {
        router.push(`/diary/${values.date}`);
      },
      (error: Error) => console.log(error)
    );
  }, [values, images]);

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
