import React from "react";
// import StripeCheckout from "react-stripe-checkout";
import Container from "./styles/Container";
import { Button, StyledProceedButton, ButtonSpan } from "./styles/Button";

const Payment = (props) => {
  let link;

  if (props.location) {
    // grab the state of the current window location(aka pdfLink)
    link = props.location.state.pdfLink;
  }

  // preview the pdf in a new tab
  const previewPdf = () => {
    if (link) {
      const newWindow = window.open(link, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    } else {
      alert("Cannot show preview atm! :-(");
    }
  };

  return (
    <Container>
      <h2>Payment Methods</h2>
      <br />
      <label>
        <input type="radio" name="payment" value="Wire Transfer" />
        Wire Transfer
      </label>
      <br />
      <label>
        <input type="radio" name="payment" value="Pin Payment" />
        Pin Payment
      </label>
      <br />
      <StyledProceedButton onClick={() => previewPdf()}>
        <ButtonSpan>Pdf Preview</ButtonSpan>
      </StyledProceedButton>
    </Container>
  );
};

export default Payment;
