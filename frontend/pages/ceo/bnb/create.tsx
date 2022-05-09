import React, { useCallback, useState } from "react";
import { WideButton } from "../../../components/WideButton";
import { Container } from "../../../styles/Basic";
import InputForm from "../../../components/ceo/InputForm";
import ImageForm from "../../../components/ceo/ImageForm";
import PostCode from "../../../components/ceo/Postcode";
import Switches from "../../../components/ceo/Switches";
import Script from "next/script";
import { useRouter } from "next/router";
import { CeoBnbCreate } from "../../../api/ceo";

export interface IValues {
  name: string;
  description: string;
  price: number | string;
  people: number | string;
  isGarden: boolean;
  isCooking: boolean;
}

export interface IImages {
  files: File;
  previewURL: string;
}

const BnbCreate = () => {
  const [values, setValues] = useState<IValues>({
    name: "",
    description: "",
    price: "",
    people: "",
    isGarden: false,
    isCooking: false,
  });
  const [address, setAddress] = useState<String>("");
  const [images, setImages] = useState<Array<IImages>>([]);
  const [onScriptLoad, setOnScriptLoad] = useState<boolean>(false);

  const router = useRouter();
  const onClick = useCallback(() => {
    // if (!address) {
    //   alert("주소를 입력해주세요.");
    //   return;
    // }

    // 1. api 전송
    const form = new FormData();
    const dto = {
      loc: address,
      price: values.price,
      cnt: values.people,
      garden: values.isGarden ? 1 : 0,
      cooking: values.isCooking ? 1 : 0,
      contents: values.description,
      name: values.name,
    };
    form.append("dto", JSON.stringify(dto));

    images?.map((image) => form.append("file", image.files));

    console.log(form.get("dto"));
    console.log(form.get("file"));
    console.log(images);

    CeoBnbCreate(
      form,
      (response: any) => console.log(response),
      (error: Error) => console.log(error)
    );
    // 2. router push
    // router.push(`/ceo/bnb`);
  }, [address, images, values]);

  return (
    <Container>
      <Script
        src={`//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`}
        onLoad={() => setOnScriptLoad(true)}
      />
      숙소 등록
      <InputForm values={values} setValues={setValues} />
      <Switches values={values} setValues={setValues} />
      <ImageForm images={images} setImages={setImages} />
      <PostCode />
      {/* <div id="popup-address">{onScriptLoad ? <PostCode /> : null}</div> */}
      <WideButton onClick={onClick} text="숙소 등록하기" />
    </Container>
  );
};

export default BnbCreate;
