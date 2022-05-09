import React, { useState } from "react";
import ReactDOM from "react-dom";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const Container = styled.div`
  height: 500px;
`;
const Postcode = () => {
  const [height, setHeight] = useState("");
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

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleResize = (size: any) => {
    setHeight(size.height);
  };

  const modalContent = (
    <Container>
      <DaumPostcode
        // style={{ height: "200px" }}
        autoClose
        onResize={handleResize}
        onComplete={handleComplete}
      />
    </Container>
  );

  //   if (typeof window !== "undefined") {
  //     return ReactDOM.createPortal(
  //       modalContent,
  //       document.getElementById("popup-address")!
  //     );
  //   } else return null;

  return modalContent;
};

export default Postcode;
