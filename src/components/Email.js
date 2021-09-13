import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Handlebars from "handlebars";
import qs from "query-string";
import { GlobalContext } from "../context/GlobalState";
import { getAPI } from "../api/axios";
import Template from "./Template";
import Spinner from "../styles/Spinner";
import EmailContainer from "../styles/EmailContainer";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";

export default function Email() {
  const { ResolvedHTML, EntryValues, EntryId, FormValue } =
    useContext(GlobalContext);
  const [resolvedHTML, setResolvedHTML] = ResolvedHTML;
  const { setEntryId } = EntryId;
  const [entryValues, setEntryValues] = EntryValues;
  const [form] = FormValue;

  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState("none");
  const [err, setErr] = useState("none");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getHTMLAndValues(); // eslint-disable-next-line
  }, []);

  const getHTMLAndValues = async () => {
    // to get the params (emailTemplate id and recordValueId) from URL
    const { id, uuid } = qs.parse(location.search);

    try {
      const HTML = await getAPI({ url: "getEmail", id }); //get email template
      const values = await getAPI({ url: "getAppointment", id: uuid }); // get appointment data
      const {
        "fee-schedule": { recordValueId },
      } = values;
      setEntryId(recordValueId);
      setEntryValues(values);

      const handleBarTemplate = Handlebars.compile(HTML);
      const resolvedTemplate = handleBarTemplate(values).replace("\n", " ");
      setResolvedHTML(resolvedTemplate);

      setLoading(false);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  //error popup disappears after 1800ms
  useEffect(() => {
    if (err === "Missing required field")
      setTimeout(() => {
        setErr("none");
      }, 1800);
  }, [err]);

  const handleClick = () => {
    // check input values
    if (!form.name || signature === "none" || !form.date) {
      setErr("Missing required field");
      return;
    }

    //get signature_form from DOM
    const signature_form = document.getElementById("form-template").innerHTML;

    //virtual DOM to remove "#signature-link" div
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = resolvedHTML;
    tempDiv.querySelector("#signature-link").remove();
    const TemplateString = tempDiv.outerHTML.replace("\n", " ");

    //required html stored as string in the object
    const pdfHTMLString = {
      TemplateString: TemplateString,
      SignatureFormString: signature_form,
    };

    //object stroed to localStorage to be accessed during pdf generation
    localStorage.setItem("pdfHTMLString", JSON.stringify(pdfHTMLString));

    //values required for payment
    const description = entryValues["fee-schedule"]["service-type"];
    const amount = entryValues["fee-schedule"]["feeAmount"];

    // open the payment url
    history.push({
      pathname: "/payment-methods",
      state: { description, amount },
    });
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <EmailContainer>
        {resolvedHTML ? (
          <Template
            signature={signature}
            setSignature={setSignature}
            err={err}
          />
        ) : null}
        <StyledProceedButton onClick={handleClick}>
          <ButtonSpan>Proceed</ButtonSpan>
        </StyledProceedButton>
      </EmailContainer>
    </>
  );
}
