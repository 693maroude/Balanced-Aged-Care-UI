import { StyledProceedButton, ButtonSpan } from "./styles/Button";
import React, { useState, useEffect } from "react";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import Form from "./SignatureForm";
import { useLocation, useHistory } from "react-router-dom";
import qs from "query-string";
import { getAPI, postAPI } from "../api/axios";
import Handlebars from "handlebars";

export default function Email() {
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState("none");
  const [form, setForm] = useState({
    name: "",
    date: "",
    err: "",
  });
  // const [pdfLink, setPdfLink] = useState(null);
  const [resolvedHTML, setResolvedHTML] = useState(null);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getHTMLAndValues();
  }, []);

  // get the HTML template + its corresponding dynamic values
  const getHTMLAndValues = async () => {
    // to get the params (emailTemplate id and recordValueId) from URL
    // URL --> /email?id=108976&&recordValueId=158765
    // templateId: 108976, recordId: 158765, 158238, 173202
    const { id, recordValueId } = qs.parse(location.search);
    try {
      const HTML = await getAPI({ url: "getEmail", id });
      const values = await getAPI({ url: "getAppointment", id: recordValueId });
      console.log(HTML, values);
      setLoading(false);

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

      console.log("resolvedHTML --> ", resolvedHTML);
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

    // getting HTML string from DOM node
    let template = document
      .getElementById("template")
      .outerHTML.replace("\n", " ");

    try {
      const pdfLink = await postAPI({ url, id, template });
      setLoading(false);

      // open the payment url
      history.push({
        pathname: "/payment",
        state: { pdfLink },
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
          <div
            id="template"
            dangerouslySetInnerHTML={{ __html: resolvedHTML }}
          />
        ) : null}
        <Form
          signature={signature}
          setSignature={setSignature}
          form={form}
          setForm={setForm}
        />

        <StyledProceedButton onClick={createPdf}>
          <ButtonSpan>Proceed</ButtonSpan>
        </StyledProceedButton>
      </EmailContainer>
    </>
  );
}
