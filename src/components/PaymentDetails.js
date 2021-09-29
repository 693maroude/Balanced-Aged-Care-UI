import React from "react";
import Container from "../styles/Container";

const PaymentDetails = () => {
  return (
    <Container>
      <h3>Payment Details</h3>
      <hr style={{ marginBottom: "20px" }} />
      Please refer to your Invoice that will be emailed shortly
    </Container>
  );
};

export default PaymentDetails;
