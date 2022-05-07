import React, { useCallback, useState } from "react";
import {
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "styled-components";
import { WideButton } from "../../../components/WideButton";
import { Container } from "../../../styles/Basic";

const Input = styled.input`
  display: none;
`;

interface IImageContainerTypes {
  url: any;
}

const ImageContainerGroup = styled.div`
  /* display: flex; */
  /* max-width: 100%; */
  width: 100%;
`;

const ImageContainer = styled.div<IImageContainerTypes>`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 5%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
`;

interface IValues {
  name: string;
  description: string;
  price: number | string;
  people: number | string;
  isGarden: boolean;
  isCooking: boolean;
}

const BnbCreate = () => {
  const [values, setValue] = useState<IValues>({
    name: "",
    description: "",
    price: "",
    people: "",
    isGarden: false,
    isCooking: false,
  });
  const [images, setImages] = useState<Array<String>>([]);

  const handleChange = useCallback(
    ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = {
        ...values,
        [id]: value,
      };
      setValue(nextValues);
    },
    [values]
  );

  const handleSwitch = useCallback(
    ({ target: { id, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      console.log(id + " " + checked);
      const nextValues = {
        ...values,
        [id]: checked,
      };
      setValue(nextValues);
    },
    [values]
  );

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const nextImages = [];
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        const imageURL = URL.createObjectURL(files[i]);
        nextImages.push(imageURL);
      }

      setImages(nextImages);
    },
    []
  );

  return (
    <Container>
      숙소 등록
      <TextField
        label="숙소 이름"
        id="name"
        value={values.name}
        onChange={handleChange}
      />
      <TextField
        label="숙소 설명"
        id="description"
        multiline
        rows={4}
        value={values.description}
        onChange={handleChange}
      />
      <TextField
        label="숙소 가격 (1박)"
        id="price"
        value={values.price}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">원</InputAdornment>,
        }}
      />
      <TextField
        label="최대 인원"
        id="people"
        value={values.people}
        onChange={handleChange}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">명</InputAdornment>,
        }}
      />
      <FormControlLabel
        control={
          <Switch
            id="isGarden"
            checked={values.isGarden}
            onChange={handleSwitch}
          />
        }
        label="마당 있음"
      />
      <FormGroup></FormGroup>
      <FormControlLabel
        control={
          <Switch
            id="isCooking"
            checked={values.isCooking}
            onChange={handleSwitch}
          />
        }
        label="취사 가능"
      />
      <label htmlFor="upload">
        <Input
          accept="image/*"
          id="upload"
          multiple
          type="file"
          onChange={handleImage}
        />
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <ImageContainerGroup>
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {images.map((image, index) => {
            console.log(image);
            return <ImageContainer key={index} url={image} />;
          })}
        </div>
      </ImageContainerGroup>
      <WideButton href={`/ceo/bnb`} text="숙소 등록하기" />
    </Container>
  );
};

export default BnbCreate;
