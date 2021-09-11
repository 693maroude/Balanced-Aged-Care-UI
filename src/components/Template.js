import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { GlobalContext } from "../context/GlobalState";
import SignatureForm from "./SignatureForm";

const Template = ({ signature, setSignature, err }) => {
  const { ResolvedHTML, FormValue } = useContext(GlobalContext);
  const [resolvedHTML] = ResolvedHTML;
  const [form, setForm] = FormValue;

  useEffect(() => {
    if (document.getElementById("signature-link"))
      document.getElementById("signature-link").remove();
  }, []);

  useEffect(() => {
    ReactDOM.render(
      <SignatureForm
        signature={signature}
        setSignature={setSignature}
        form={form}
        setForm={setForm}
        err={err}
      />,
      document.getElementById("form-template")
    );
  }, [signature, setSignature, form, err, setForm]);

  return (
    <div
      id="template"
      dangerouslySetInnerHTML={{ __html: resolvedHTML }}
      style={{ width: "100%" }}
    />
  );
};

export default Template;
