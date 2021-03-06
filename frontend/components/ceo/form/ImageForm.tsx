import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "styled-components";
import { IImages } from "../../../pages/ceo/bnb/create";

interface IPropTypes {
  images: Array<IImages>;
  setImages: Dispatch<SetStateAction<Array<IImages>>>;
}

const Input = styled.input`
  display: none;
`;

interface IImageContainerTypes {
  url: any;
}

const ImageContainerGroup = styled.div`
  width: 100%;
`;

const ImageContainerWrapper = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  margin: 1rem 0;
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

const Label = styled.label`
  &:hover {
    cursor: pointer;
  }
`;

const ImageForm = ({ images, setImages }: IPropTypes) => {
  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const nextImages = [];
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        const imageURL = URL.createObjectURL(files[i]);
        nextImages.push({ files: files[i], previewURL: imageURL });
      }

      setImages(nextImages);
    },
    [setImages]
  );

  return (
    <>
      <Label htmlFor="upload">
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
        숙소 사진 첨부
      </Label>
      <ImageContainerGroup>
        <ImageContainerWrapper>
          {images.map((image, index) => {
            return <ImageContainer key={index} url={image.previewURL} />;
          })}
        </ImageContainerWrapper>
      </ImageContainerGroup>
    </>
  );
};

export default ImageForm;
