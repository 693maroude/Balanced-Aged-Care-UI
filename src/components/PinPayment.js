import React, { useState, useEffect } from "react";
import FrameContainer from "./styles/FrameContainer";
import Spinner from "./styles/Spinner";

const PinPayment = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("none");
  useEffect(() => {
    if (loading === false) setDisplay("block");
  }, [loading]);
  return (
    <>
      {loading ? <Spinner /> : null}
      <FrameContainer style={{ display: display }}>
        <iframe
          src={location.state.Link}
          title="Pin Payment"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          style={{
            height: "1150px",
            width: "400px",
          }}
          onLoad={() => setLoading(false)}
        />
      </FrameContainer>
    </>
  );
};

export default PinPayment;
