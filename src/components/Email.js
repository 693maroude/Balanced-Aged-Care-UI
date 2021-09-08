import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Handlebars from "handlebars";
import qs from "query-string";
import { getAPI, postAPI, putAPI } from "../api/axios";
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
  const [entryId, setEntryId] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    getHTMLAndValues();
  }, []);

  // get the HTML template + its corresponding dynamic values
  const getHTMLAndValues = async () => {
    // to get the params (emailTemplate id and recordValueId) from URL
    // URL --> /email?id=173636&recordValueId=158765
    // templateId: 108976, recordId: 158765, 158238, 173202
    const { id, recordValueId } = qs.parse(location.search);
    setEntryId(recordValueId);

    try {
      const HTML = await getAPI({ url: "getEmail", id });
      const values = await getAPI({ url: "getAppointment", id: recordValueId });
      setEntryValues(values);
      // dynamic values structure
      // const data = {
      //   "fee-schedule": {
      //     "service-type": "Retirement Village",
      //     "email-fee-pricing": "$990 or if paid on the day of appointment $880",
      //     "feeAmount": "990"
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
    //check input values
    if (!form.name || signature === "none" || !form.date) {
      setForm({ ...form, err: "Missing required field" });
      setTimeout(() => {
        setForm({ ...form, err: "" });
      }, 1800);
      return;
    }
    setLoading(true);

    //remove signature button before sending
    document.getElementById("remove-signature").remove();

    // getting HTML string from DOM node
    let template = document
      .getElementById("template")
      .outerHTML.replace("\n", " ");

    try {
      // create the pdf
      const s3result = await postAPI({ url: "puppeteer", id: "pdf", template });
      const pdfLink = s3result.Location;

      // update the appointment entry to store the pdf info

      const res = await putAPI({
        url: "update-appointment",
        id: entryId,
        s3result,
      });

      console.log(res);

      setLoading(false);
      const description = entryValues["fee-schedule"]["service-type"];
      const amount = entryValues["fee-schedule"]["feeAmount"];

      // open the payment url
      history.push({
        pathname: "/payment",
        state: { pdfLink, description, amount },
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
