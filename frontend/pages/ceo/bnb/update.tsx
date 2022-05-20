import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { getMyBnbDetail, updateMyBnb } from "../../../api/ceo";
import { IValues, IImages, ContentsWrapper } from "./create";
import { Container } from "../../../styles/Basic";
import Header from "../../../components/Header";
import { WideButton } from "../../../components/WideButton";
import { BACKEND_IMAGE_URL } from "../../../api";

import {
  InputForm,
  ImageForm,
  Postcode,
  Switches,
} from "../../../components/ceo/form";
import Seo from "../../../components/Seo";

const BnbUpdate = () => {
  const router = useRouter();
  const [values, setValues] = useState<IValues>({
    name: "",
    description: "",
    price: "",
    people: "",
    isGarden: false,
    isCooking: false,
  });

  const [images, setImages] = useState<Array<IImages>>([]);
  const [address, setAddress] = useState<String>("");
  const [addressDetail, setAddressDetail] = useState<String>("");
  const [postcode, setPostcode] = useState<String>("");

  useEffect(() => {
    const id = router.query.id;
    getMyBnbDetail(
      id,
      ({ data }: any) => {
        const value = {
          name: data.name,
          description: data.contents,
          price: data.price,
          people: data.cnt,
          isGarden: data.garden === "T" ? true : false,
          isCooking: data.cooking === "T" ? true : false,
        };

        const image: Array<IImages> = [];
        data?.picPath.split(",").map((path: any, index: number) => {
          image.push({
            files: new File([""], ""),
            previewURL: `${BACKEND_IMAGE_URL}/${path}`,
          });
        });
        setValues(value);
        setImages(image);
        setAddress(data.loc);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  const onClick = useCallback(() => {
    if (!address) {
      alert("주소를 입력해주세요.");
      return;
    }

    // 1. api 전송
    const form = new FormData();
    const request = {
      loc: `${address} ${addressDetail}`,
      price: values.price,
      cnt: values.people,
      garden: values.isGarden ? "T" : "F",
      cooking: values.isCooking ? "T" : "F",
      contents: values.description,
      name: values.name,
    };
    form.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );

    if (images.length > 0 && !images[0].previewURL.startsWith("http")) {
      images?.map((image) => form.append("image", image.files));
    } else form.append("image", new Blob());

    updateMyBnb(
      router.query.id,
      form,
      (response: any) => {
        alert("숙소 정보가 수정되었어요!");
        router.push(`/ceo/bnb/${router.query.id}`);
      },
      (error: Error) => console.log(error)
    );
  }, [router, address, addressDetail, images, values]);

  return (
    <Container>
      <Seo title="숙소수정" />
      <Header title="숙소 정보 수정" />
      <ContentsWrapper>
        <InputForm values={values} setValues={setValues} />
        <Switches values={values} setValues={setValues} />
        <ImageForm images={images} setImages={setImages} />
        <Postcode
          address={address}
          setAddress={setAddress}
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
          postcode={postcode}
          setPostcode={setPostcode}
        />
        <WideButton onClick={onClick} text="숙소 수정하기" />
      </ContentsWrapper>
    </Container>
  );
};

export default BnbUpdate;
