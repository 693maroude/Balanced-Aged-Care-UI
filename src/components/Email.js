import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Handlebars from "handlebars";
import qs from "query-string";
import { getAPI, postAPI } from "../api/axios";
import Template from "./Template";
import Spinner from "./styles/Spinner";
import EmailContainer from "./styles/EmailContainer";
import { StyledProceedButton, ButtonSpan } from "./styles/Button";

export default function Email() {
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState("none");
  const [form, setForm] = useState({
    name: "",
    date: new Date().toISOString().substr(0, 10),
    err: "",
  });
  // const [pdfLink, setPdfLink] = useState(null);
  const [resolvedHTML, setResolvedHTML] = useState(null);
  const [entryValues, setEntryValues] = useState("");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getHTMLAndValues();
  }, []);

  // get the HTML template + its corresponding dynamic values
  const getHTMLAndValues = async () => {
    // to get the params (emailTemplate id and recordValueId) from URL
    // URL --> /email?id=173636&&recordValueId=158765
    // templateId: 108976, recordId: 158765, 158238, 173202
    const { id, recordValueId } = qs.parse(location.search);
    try {
      const HTML = await getAPI({ url: "getEmail", id });
      const values = await getAPI({ url: "getAppointment", id: recordValueId });
      setEntryValues(values);
      // dynamic values structure
      // const data = {
      //   "fee-schedule": {
      //     "service-type": "Retirement Village",
      //     "email-fee-pricing": "$990 or if paid on the day of appointment $880",
      //   },
      // };

      const handleBarTemplate = Handlebars.compile(HTML);
      const resolvedTemplate = handleBarTemplate(values).replace("\n", " ");
      setResolvedHTML(resolvedTemplate);

      setLoading(false);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  const createPdf = async () => {
    //check input vlaues
    if (!form.name || signature === "none" || !form.date) {
      setForm({ ...form, err: "Missing required field" });
      setTimeout(() => {
        setForm({ ...form, err: "" });
      }, 1800);
      return;
    }

    setLoading(true);
    const url = "puppeteer";
    const id = "pdf";

    //remove signature button before sending
    document.getElementById("remove-signature").remove();

    // getting HTML string from DOM node
    let template = document
      .getElementById("template")
      .outerHTML.replace("\n", " ");

    try {
      const pdfLink = await postAPI({ url, id, template });
      setLoading(false);
      const description = entryValues["fee-schedule"]["service-type"];

      // open the payment url
      history.push({
        pathname: "/payment",
        state: { pdfLink, description },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <EmailContainer>
        {resolvedHTML ? (
          <Template
            resolvedHTML={resolvedHTML}
            signature={signature}
            setSignature={setSignature}
            form={form}
            setForm={setForm}
          />
        ) : null}
        <StyledProceedButton onClick={createPdf}>
          <ButtonSpan>Proceed</ButtonSpan>
        </StyledProceedButton>
      </EmailContainer>
    </>
  );
}
