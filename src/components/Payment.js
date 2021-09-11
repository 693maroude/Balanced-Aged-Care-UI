import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { GlobalContext } from "../context/GlobalState";
import Container, { PayContainer } from "../styles/Container";
import { PayButton, ButtonSpan1 } from "../styles/Button";
import List, { Em } from "../styles/List";

const Payment = ({ location: { state } }) => {
  const { EntryId } = useContext(GlobalContext);
  const { entryId } = EntryId;

  const history = useHistory();

  const onSuccess = () => {
    const date = new Date().toISOString();
    if (process.env.NODE_ENV === "development") {
      return `http://localhost:3000/success?date=${date}&entryId=${entryId}`;
    }
    return `http://kalysys-bac.s3-website-ap-southeast-2.amazonaws.com/success?date=${date}&entryId=${entryId}`;
  };

  const handlePayment = () => {
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
    history.push({
      pathname: "/pin-payment",
      state: { Link },
    });
  };

  return (
    <Container>
      <PayContainer>
        <div style={{ paddingBlock: "20px" }}>
          <h3>Payment Details</h3>
          <List direction={"column"}>
            <li>
              {" "}
              Bank Institute: <Em>St George Acc</Em>
            </li>
            <li>
              {" "}
              Name: <Em>Balance Aged Care Specialists</Em>
            </li>
            <li>
              {" "}
              BSB: <Em>112879</Em>
            </li>
            <li>
              {" "}
              ACC: <Em>413618212</Em>
            </li>
          </List>
        </div>
        <hr style={{ marginInline: "2vw" }} />
        <PayButton onClick={() => handlePayment()}>
          <ButtonSpan1>Pay Online Now</ButtonSpan1>
        </PayButton>
      </PayContainer>
    </Container>
  );
};

export default Payment;
