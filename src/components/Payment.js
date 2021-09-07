import React from "react";
import queryString from "query-string";
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

  const handlePayment = () => {
    const queryParams = queryString.stringify({
      amount: "10",
      description: `Payment for Karun Kop`,
      amount_editable: false,
      success_url:
        // process.env.NODE_ENV === "development" ?
        //http://localhost:3000/payment/${attendanceReq.data.entry.id}`,
        `http://localhost:8883/email?id=173636&&recordValueId=158765`,
      email: "karun@kalysys.com",
    });

    console.log(queryParams);

    window.location.href = `https://pay.pinpayments.com/riba/test?${queryParams}`;
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
      {/* <StyledProceedButton onClick={() => previewPdf()}>
        <ButtonSpan>Pdf Preview</ButtonSpan>
      </StyledProceedButton>
       */}
      <StyledProceedButton onClick={() => handlePayment()}>
        <ButtonSpan>Pay UP bitchh</ButtonSpan>
      </StyledProceedButton>
    </Container>
  );
};

export default Payment;
