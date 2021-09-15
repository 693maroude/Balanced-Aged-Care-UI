import React, { useState, useEffect } from "react";
import { SuccessContainer } from "../styles/Container";
import qs from "query-string";
import ErrorComponent from "./ErrorComponent";
import SuccessSVG from "../styles/SuccessSVG";
import Spinner from "../styles/Spinner";
import onPinPayment from "./onPinPayment";

const Success = ({ location }) => {
  const updateEntryData = qs.parse(location.search);

  const [loading, setLoading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(false);

  const toggleLoaderFalse = () => {
    setLoading(false);
  };

  const toggleErrorFlag = () => {
    setErrorFlag(true);
  };

  useEffect(() => {
    onPinPayment(updateEntryData, toggleLoaderFalse, toggleErrorFlag); // eslint-disable-next-line
  }, []);

  return errorFlag ? (
    <ErrorComponent Status={500} StatusMessage={"Internal Server Error"} />
  ) : loading ? (
    <Spinner />
  ) : (
    <SuccessContainer style={{ textAlign: "center" }}>
      <SuccessSVG />
      <h2 style={{ textAlign: "center" }}>
        Payment was processed successfully
      </h2>
      <br />
      <div style={{ textAlign: "center" }}>Thank you for your billing.</div>
    </SuccessContainer>
  );
};

export default Success;
