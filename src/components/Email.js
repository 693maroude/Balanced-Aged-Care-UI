import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import CreateSignatureButton from "./CreateSignatureButton";

export default function Email() {
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);

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
      entry[1].removeChild(entry[1].children[1]);

      const elmnt = document.createElement("span");
      ReactDOM.render(<CreateSignatureButton />, elmnt);

      entry[1].append(elmnt);
      // let formData = {};
      // Array.from(entry).forEach((node, i) => {
      //   const type = node.getAttribute("data-type");
      //   const dataId = node.getAttribute("data-id");
      //   const inputNode = node.children[1];
      //   formData[dataId] = { value: "", type };
      // });
      // console.log(formData);
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
