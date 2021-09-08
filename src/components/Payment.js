import React from "react";
import queryString from "query-string";
import Container from "./styles/Container";
import { StyledProceedButton, ButtonSpan } from "./styles/Button";

const Payment = ({ location }) => {
  // preview the pdf in a new tab
  // const previewPdf = () => {
  //   if (location) {
  //     const newWindow = window.open(
  //       location.state.pdfLink,
  //       "_blank",
  //       "noopener,noreferrer"
  //     );
  //     if (newWindow) newWindow.opener = null;
  //   } else {
  //     alert("Cannot show preview atm! :-(");
  //   }
  // };

  const handlePayment = () => {
    const queryParams = queryString.stringify({
      amount: location ? location.state.amount : "0",
      description: location ? location.state.description : "No description",
      amount_editable: false,
      success_url:
        process.env.NODE_ENV === "development"
          ? `http://localhost:10614/success`
          : `http://kalysys-bac.s3-website-ap-southeast-2.amazonaws.com/success`,
    });

    window.location.href = `https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`; // test link
    // window.location.href = `https://pay.pinpayments.com/rjzf/sc?${queryParams}`; // live link
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
      <StyledProceedButton onClick={() => handlePayment()}>
        <ButtonSpan>Pay Now</ButtonSpan>
      </StyledProceedButton>
    </Container>
  );
};

export default Payment;
