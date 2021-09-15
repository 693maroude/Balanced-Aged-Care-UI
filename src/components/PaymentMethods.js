import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { GlobalContext } from "../context/GlobalState";
import Container from "../styles/Container";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";
import {
  RadioContainer,
  RadioLabel,
  RadioInput,
  RadioSpan,
} from "../styles/Radio";
import ErrorPopUp from "../styles/ErrorPopUp";

const PaymentMethods = ({ location: { state } }) => {
  const { EntryId } = useContext(GlobalContext);
  const { entryId } = EntryId;

  const [err, setErr] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const history = useHistory();

  const onSuccess = () => {
    const date = new Date().toISOString();
    return `${window.origin}/success?date=${date}&entryId=${entryId}`;
  };

  const handlePayment = () => {
    // check input values
    if (!paymentMethod) {
      setErr("Please select one Payment method");
      return;
    }

    const queryParams = queryString.stringify({
      amount: state.amount ? state.amount : "0",
      description: state.description ? state.description : "No description",
      amount_editable: false,
      success_url: onSuccess(),
    });

    // window.location.href = `https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`; // test link
    // window.location.href = `https://pay.pinpayments.com/rjzf/sc?${queryParams}`; // live link

    //rest of the process is carried out in iframe within the "pin-payment" component
    //if user reloads on payment success route, pdf is not created twice, but user is directed to this.Link
    const Link = `https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`; // test link

    if (paymentMethod === "pay_online")
      history.push({ pathname: "/pin-payment", state: { Link } });
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
