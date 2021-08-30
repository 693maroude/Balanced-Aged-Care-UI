import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import CreateSignatureButton from "./CreateSignatureButton";

export default function Email() {
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState(null);

  const Signature = () => {
    return signature ? (
      <img src={signature} alt="Signature" height="80" />
    ) : (
      <CreateSignatureButton setSignature={setSignature} />
    );
  };

  useEffect(() => {
    if (signature !== null) {
      ReactDOM.render(<Signature />, document.getElementById("signature-div"));
    }
  }, [signature]);

  const getBody = async () => {
    try {
      const res = await axios.get(
        `https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/getEmail/168909`
      );
      setBody(res.data.body);
      setLoading(false);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  useEffect(() => {
    getBody();
  }, []);

  useEffect(() => {
    if (loading === false) {
      const entry = document.getElementsByClassName("dynamic-entry");
      const signatureEntry = entry[1];
      signatureEntry.removeChild(signatureEntry.children[1]);

      const div = document.createElement("div");
      div.id = "signature-div";
      div.style.backgroundColor = "var(--primary-color";
      div.style.textAlign = "center";
      div.style.paddingBlock = "10px";
      div.style.borderRadius = "6px";

      ReactDOM.render(<Signature />, div);

      signatureEntry.append(div);

      Array.from(entry).forEach((node) => {
        const type = node.getAttribute("data-type");
        const inputNode = node.children[1];
        if (type !== "signature") inputNode.disabled = false;
      });
    }
  }, [loading]);

  return loading ? (
    <Spinner />
  ) : (
    <EmailContainer>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </EmailContainer>
  );
}
