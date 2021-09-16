import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "../styles/Container";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";
import {
  RadioContainer,
  RadioLabel,
  RadioInput,
  RadioSpan,
} from "../styles/Radio";
import ErrorPopUp from "../styles/ErrorPopUp";

const PaymentMethods = () => {
  const [err, setErr] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const history = useHistory();

  const handlePayment = () => {
    // check input values
    if (!paymentMethod) {
      setErr("Please select one Payment method");
      return;
    }
    if (paymentMethod === "pay_online")
      history.push({ pathname: "/pin-payment" });
    else if (paymentMethod === "wire_transfer")
      history.push({ pathname: "/wire-transfer" });
  };

  //error popup disappears after 1800ms
  useEffect(() => {
    if (err === "Please select one Payment method")
      setTimeout(() => {
        setErr(false);
      }, 1800);
  }, [err]);

  return (
    <>
      <Container>
        <h3>How would you like to pay?</h3>
        <hr />
        <RadioContainer>
          <RadioLabel htmlFor="wire_transfer">
            <RadioInput
              id="wire_transfer"
              name="payment_method"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="wire_transfer"
              checked={paymentMethod === "wire_transfer"}
            />
            <RadioSpan />
            Via WireTransfer
          </RadioLabel>
          <RadioLabel htmlFor="pay_online">
            <RadioInput
              id="pay_online"
              name="payment_method"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="pay_online"
              checked={paymentMethod === "pay_online"}
            />
            <RadioSpan />
            Pay Online Now
          </RadioLabel>
        </RadioContainer>
        <StyledProceedButton onClick={handlePayment}>
          <ButtonSpan>Make Payment</ButtonSpan>
        </StyledProceedButton>
      </Container>
      {err ? <ErrorPopUp> &#10097; {err} !!!</ErrorPopUp> : null}
    </>
  );
};

export default PaymentMethods;
