import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Form from "./SignatureForm";

const Template = ({ resolvedHTML, signature, setSignature, form, setForm }) => {
  useEffect(() => {
    if (document.getElementById("signature-link"))
      document.getElementById("signature-link").remove();
  }, []);

  useEffect(() => {
    ReactDOM.render(
      <Form
        signature={signature}
        setSignature={setSignature}
        form={form}
        setForm={setForm}
      />,
      document.getElementById("form-template")
    );
  }, [signature, setSignature, form, setForm]);

  return (
    <div id="template" dangerouslySetInnerHTML={{ __html: resolvedHTML }} />
  );
};

export default Template;
