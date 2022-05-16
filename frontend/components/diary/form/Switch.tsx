import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { flexCenter } from "../../../styles/Basic";

const Container = styled.div`
  ${flexCenter};
  margin-bottom: 1rem;
`;

const Switches = () => {
  let status = false;
  return (
    <Container>
      <FormControlLabel
        control={
          <Switch
            id="status"
            // checked={values.isGarden}
            // onChange={handleSwitch}
          />
        }
        label={status ? "일기 공개" : "일기 비공개"}
      />
    </Container>
  );
};

export default Switches;
