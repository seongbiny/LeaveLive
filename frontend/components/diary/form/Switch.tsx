import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Basic";
import { IValues } from "../../../pages/diary/write";

interface IPropTypes {
  values: IValues;
  setValues: Dispatch<SetStateAction<IValues>>;
}

const Container = styled.div`
  ${flexCenter};
  margin-bottom: 1rem;
`;

const Switches = ({ values, setValues }: IPropTypes) => {
  const handleSwitch = useCallback(
    ({ target: { id, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = {
        ...values,
        [id]: checked,
      };
      setValues(nextValues);
    },
    [values, setValues]
  );

  return (
    <Container>
      <FormControlLabel
        control={
          <Switch id="status" checked={values.status} onChange={handleSwitch} />
        }
        label={
          values.status ? "다른 사람들에게 공개" : "다른 사람들에게 비공개"
        }
      />
    </Container>
  );
};

export default Switches;
