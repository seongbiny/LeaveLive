import React, { Dispatch, SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Basic";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface IPropTypes {
  isShow?: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<String>>;
  setPostcode: Dispatch<SetStateAction<String>>;
}

interface IModalOverlay {
  isShow?: boolean;
}

const ModalOverlay = styled.div<IModalOverlay>`
  ${flexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  z-index: 200;
`;

const ModalWrapper = styled.div`
  width: 300px;
  height: 466px;
  display: flex;
  align-items: flex-start;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
`;

const CloseButton = styled.div`
  position: absolute;
  bottom: -50px;
  right: 0;
  width: 90px;
  height: 40px;
  border-radius: 12%;
  background-color: white;
  ${flexCenter}
`;

const SearchPostcode = ({
  isShow,
  setIsShow,
  setAddress,
  setPostcode,
}: IPropTypes) => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    document.body.style.overflow = "unset";
    setIsShow(false);
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const modalContent = isShow ? (
    <ModalOverlay isShow={isShow}>
      <ModalWrapper>
        <CloseButton
          onClick={() => {
            document.body.style.overflow = "unset";
            setIsShow(false);
          }}
        >
          닫기 <CloseRoundedIcon style={{ marginLeft: "0.6rem" }} />
        </CloseButton>
        <DaumPostcode style={{ height: "466px" }} onComplete={handleComplete} />
      </ModalWrapper>
    </ModalOverlay>
  ) : null;

  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else return null;

  // return modalContent;
};

export default SearchPostcode;
