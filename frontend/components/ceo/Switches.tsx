import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { IValues } from "../../pages/ceo/bnb/create";
import styled from "styled-components";
import { flexCenter } from "../../styles/Basic";

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
          <Switch
            id="isGarden"
            checked={values.isGarden}
            onChange={handleSwitch}
          />
        }
        label="마당 있음"
      />
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
    </Container>
  );
};

export default Switches;
