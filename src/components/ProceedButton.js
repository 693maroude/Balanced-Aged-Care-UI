import React from "react";
import { StyledProceedButton, ButtonSpan } from "./styles/Button";

const Proceed = ({ handleClick }) => {
  return (
    <StyledProceedButton
      onClick={() => {
        handleClick();
      }}
    >
      <ButtonSpan>Proceed</ButtonSpan>
    </StyledProceedButton>
  );
};

export default Proceed;
