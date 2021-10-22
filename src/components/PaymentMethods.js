import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { getAPI } from "../api/axios";
import Container from "../styles/Container";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";
import {
  RadioContainer,
  RadioLabel,
  RadioInput,
  RadioSpan,
} from "../styles/Radio";
import Spinner from "../styles/Spinner";
import ErrorPopUp from "../styles/ErrorPopUp";

const PaymentMethods = () => {
  const { EntryId } = useContext(GlobalContext);
  const { entryId } = EntryId;

  const [err, setErr] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payOnline, setPayOnline] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const getAppointmentDiff = async () => {
      if (!entryId) {
        history.go(-2);
        return;
      }

      const { payOnline } = await getAPI({
        url: "paymentFlagLogic",
        entryId,
      });
      setPayOnline(payOnline);
      setLoading(false);
    };
    getAppointmentDiff();
  }, [entryId, history]);

  const handlePayment = () => {
    // check input values
    if (!paymentMethod) {
      setErr("Please select one Payment method");
      return;
    }
    if (paymentMethod === "pay_online")
      history.push({ pathname: "/pin-payment" });
    else if (paymentMethod === "wire_transfer")
      history.push({ pathname: "/payment-details" });
  };

  //error popup disappears after 1800ms
  useEffect(() => {
    if (err === "Please select one Payment method")
      setTimeout(() => {
        setErr(false);
      }, 1800);
  }, [err]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Container Pay={true}>
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
            In person by cash/cheque or by Internet Bank Transfer
          </RadioLabel>
          <RadioLabel htmlFor="pay_online" Disabled={!payOnline}>
            <RadioInput
              id="pay_online"
              name="payment_method"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="pay_online"
              checked={paymentMethod === "pay_online"}
              disabled={!payOnline}
            />
            <RadioSpan />
            Pay by card online now
          </RadioLabel>
        </RadioContainer>
        <StyledProceedButton onClick={handlePayment}>
          <ButtonSpan>Make Payment</ButtonSpan>
        </StyledProceedButton>
      </Container>
      {err ? <ErrorPopUp> &#10097; {err} !!!</ErrorPopUp> : null};
    </>
  );
};

export default PaymentMethods;
