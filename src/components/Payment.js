import React from "react";
// import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Container, { HR } from "./styles/Container";
import { PayButton, ButtonSpan1 } from "./styles/Button";
import List, { Em } from "./styles/List";

const Payment = ({ location: { state } }) => {
  // const history = useHistory();

  // preview the pdf in a new tab
  // const previewPdf = () => {
  //   if (location) {
  //     const newWindow = window.open(
  //       location.state.pdfLink,
  //       "_blank",
  //       "noopener,noreferrer"
  //     );
  //     if (newWindow) newWindow.opener = null;
  //   } else {
  //     alert("Cannot show preview atm! :-(");
  //   }
  // };

  const handlePayment = () => {
    const queryParams = queryString.stringify({
      amount: state.amount ? state.amount : "0",
      description: state.description ? state.description : "No description",
      amount_editable: false,
      success_url:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/success?date=${state.date}&entryId=${state.entryId}`
          : `http://kalysys-bac.s3-website-ap-southeast-2.amazonaws.com/success`,
    });

    window.location.href = `https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`; // test link
    // window.location.href = `https://pay.pinpayments.com/rjzf/sc?${queryParams}`; // live link

    // const Link = `https://pay.pinpayments.com/rjzf/sc/test?${queryParams}`; // test link
    // history.push({
    //   pathname: "/pin-payment",
    //   state: { Link },
    // });
  };

  return (
    <Container>
      <div style={{ position: "relative", display: "flex" }}>
        <div style={{ padding: "20px", paddingRight: "30px" }}>
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
        <HR />
        <PayButton onClick={() => handlePayment()}>
          <ButtonSpan1>Pay Online Now</ButtonSpan1>
        </PayButton>
      </div>
    </Container>
  );
};

export default Payment;
