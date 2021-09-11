import React, { useState, useEffect } from "react";
import { SuccessContainer } from "../styles/Container";
import qs from "query-string";
import SuccessSVG from "../styles/SuccessSVG";
import Spinner from "../styles/Spinner";
import createPdf from "./createPdf";

const Success = ({ location }) => {
  const updateEntryData = qs.parse(location.search);
  const [loading, setLoading] = useState(true);

  const toggleLoaderFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    createPdf(updateEntryData, toggleLoaderFalse); // eslint-disable-next-line
  }, []);

  return loading ? (
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
