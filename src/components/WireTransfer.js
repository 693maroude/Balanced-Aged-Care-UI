import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import onWireTransfer from "./onWireTransfer";
import { Em } from "../styles/List";
import List from "../styles/List";
import Spinner from "../styles/Spinner";
import Container from "../styles/Container";

const WireTransfer = () => {
  const { EntryId } = useContext(GlobalContext);
  const { entryId } = EntryId;
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");
  const toggleLoaderFalse = () => {
    setLoading(false);
  };
  useEffect(() => {
    onWireTransfer(entryId, toggleLoaderFalse); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loading === false) setDisplay("block");
  }, [loading]);

  return (
    <>
      {loading ? <Spinner /> : null}
      <Container style={{ display: display }}>
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
    </>
  );
};

export default WireTransfer;
