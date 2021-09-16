import React from "react";
import { Em } from "../styles/List";
import List from "../styles/List";
import Container from "../styles/Container";

const WireTransfer = () => {
  return (
    <Container>
      <h3>Payment Details</h3>
      <hr style={{ marginBottom: "20px" }} />
      <List direction={"column"}>
        <li style={{ fontSize: "1.2rem" }}>
          {" "}
          Bank Institute: <Em>St George Acc</Em>
        </li>
        <li style={{ fontSize: "1.2rem" }}>
          {" "}
          Name: <Em>Balance Aged Care Specialists</Em>
        </li>
        <li style={{ fontSize: "1.2rem" }}>
          {" "}
          BSB: <Em>112879</Em>
        </li>
        <li style={{ fontSize: "1.2rem" }}>
          {" "}
          ACC: <Em>413618212</Em>
        </li>
      </List>
    </Container>
  );
};

export default WireTransfer;
