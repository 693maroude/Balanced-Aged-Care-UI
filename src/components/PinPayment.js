import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { GlobalContext } from "../context/GlobalState";
import FrameContainer from "../styles/FrameContainer";
import Spinner from "../styles/Spinner";

const PinPayment = () => {
  const { EntryValues, EntryId } = useContext(GlobalContext);
  const { entryId } = EntryId;
  const { entryValues } = EntryValues;
  const [payLink, setPayLink] = useState(null);

  const history = useHistory();

  useEffect(
    () => {
      if (!entryId || !entryValues) {
        history.go(-2);
        return;
      }

      //values required for payment
      const description = entryValues["fee-schedule"]["service-type"];
      const amount = entryValues["fee-schedule"]["feeAmount"];
      const date = new Date().toISOString();

      const queryParams = queryString.stringify({
        amount: amount,
        description: description ? description : "No description",
        amount_editable: false,
        success_url: `${window.origin}/success?date=${date}&entryId=${entryId}`,
      });

      setPayLink(`https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`);
    }, // eslint-disable-next-line
    []
  );

  return !payLink ? (
    <Spinner />
  ) : (
    <FrameContainer>
      <iframe
        src={payLink}
        title="Pin Payment"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{
          height: "90vh",
          width: "min(400px,94vw)",
        }}
      />
    </FrameContainer>
  );
};

export default PinPayment;
