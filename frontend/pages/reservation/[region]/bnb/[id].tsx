import React from "react";

const bnbDetail = (props: any) => {
  return(
    <>
      <div>{props.contents}</div>
      <div>{props.cooking}</div>
      <div>{props.garden}</div>
      <div>{props.loc}</div>
    </>
  )
};

export default bnbDetail;
