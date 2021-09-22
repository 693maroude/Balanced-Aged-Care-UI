import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Handlebars from "handlebars";
import qs from "query-string";
import { GlobalContext } from "../context/GlobalState";
import { getAPI, putAPI, postAPI } from "../api/axios";
import Template from "./Template";
import ErrorComponent from "./ErrorComponent";
import Spinner from "../styles/Spinner";
import EmailContainer from "../styles/EmailContainer";
import { StyledProceedButton, ButtonSpan } from "../styles/Button";
import createHTML from "./createHTML";

export default function Email() {
  const { ResolvedHTML, EntryValues, EntryId, FormValue, Signature } =
    useContext(GlobalContext);
  const [resolvedHTML, setResolvedHTML] = ResolvedHTML;
  const { setEntryValues } = EntryValues;
  const { entryId, setEntryId } = EntryId;
  const [form] = FormValue;
  const [signature, setSignature] = Signature;

  const [loading, setLoading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(false);
  const [err, setErr] = useState(false);
  const location = useLocation();
  const [errorFlagType, setErrorFlagType] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getHTMLAndValues(); // eslint-disable-next-line
  }, []);

  const getHTMLAndValues = async () => {
    // to get the params (emailTemplate id and recordValueId) from URL
    const { id, uuid } = qs.parse(location.search);

    try {
      const response = await getAPI({
        url: "getEmail",
        id,
        appointmentEntryId: uuid,
      }); //get email template

      //if pdf and payment
      if (
        response.flag &&
        response.flag.pdfExists &&
        response.flag.dateOfPaymentExists
      ) {
        //redirect
        history.push({
          pathname: "/invalid-request",
          state: { payFlag: response.flag.dateOfPaymentExists },
        });
        return;
      }

      const values = await getAPI({ url: "getAppointment", id: uuid }); // get appointment data
      const {
        "fee-schedule": { recordValueId },
      } = values;
      setEntryId(recordValueId);
      setEntryValues(values);

      if (response.flag && !response.flag.dateOfPaymentExists) {
        //redirect
        history.push({
          pathname: "/invalid-request",
          state: { payFlag: response.flag.dateOfPaymentExists },
        });
        return;
      }

      const handleBarTemplate = Handlebars.compile(response);
      const resolvedTemplate = handleBarTemplate(values).replace("\n", " ");
      setResolvedHTML(resolvedTemplate);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrorFlag(true);
    }
  };

  //error popup disappears after 1800ms
  useEffect(() => {
    if (err === "Missing required field")
      setTimeout(() => {
        setErr(false);
      }, 1800);
  }, [err]);

  // CREATE PDF ON PROCEED
  const handleClick = async () => {
    setLoading(true);
    // check input values
    if (!form.name || signature === false || !form.date) {
      setLoading(false);
      setErr("Missing required field");
      return;
    }

    const finalHTML = createHTML({ resolvedHTML });

    try {
      //create the pdf

      const s3result = await postAPI({
        url: "puppeteer",
        id: "pdf",
        template: finalHTML.outerHTML.replace("\n", " "),
      });

      // update the appointment entry to store the pdf info
      await putAPI({
        url: "update-appointment",
        id: entryId,
        body: s3result,
      });

      setLoading(false);

      // open the payment url
      history.push({
        pathname: "/payment-methods",
      });
    } catch (err) {
      setLoading(false);
      setErrorFlagType(500);
      setErrorFlag(true);
    }
  };

  return errorFlag ? (
    errorFlagType === 500 ? (
      <ErrorComponent Status={500} StatusMessage={"Internal Server Error"} />
    ) : (
      <ErrorComponent Status={404} StatusMessage={"Page not found"} />
    )
  ) : loading ? (
    <Spinner />
  ) : (
    <EmailContainer>
      {resolvedHTML ? (
        <Template signature={signature} setSignature={setSignature} err={err} />
      ) : null}
      <StyledProceedButton onClick={handleClick}>
        <ButtonSpan>Proceed</ButtonSpan>
      </StyledProceedButton>
    </EmailContainer>
  );
}
