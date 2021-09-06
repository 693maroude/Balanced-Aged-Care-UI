import React, { useState } from "react";
import Proceed from "./ProceedButton";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import Form from "./SignatureForm";
import { HTML } from "./temp";
import { useHistory } from "react-router-dom";
import { postAPI } from "../api/axios";

export default function Email() {
  const [body /*, setBody*/] = useState(HTML);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState("none");
  const [form, setForm] = useState({
    name: "",
    date: "",
    err: "",
  });

  // const location = useLocation();
  const history = useHistory();

  // to get the params (emailTemplate id and recordValueId) from URL

  // useEffect(() => {
  //   console.log(window.location.href);
  //   console.log(location);
  //   console.log(qs.parse(location.search));

  //   const { id, recordValueId } = qs.parse(location.search);
  //   console.log(id, recordValueId);
  // }, []);

  // const getBody = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/getEmail/168909`
  //     );
  //     //setLoading(false);
  //     console.log(res.data.body);
  //   } catch (err) {
  //     console.error("API Error", err);
  //   }
  // };

  // const getAppointmentValues = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://1tz4y5lnl9.execute-api.ap-southeast-2.amazonaws.com/dev/getAppointment/158238`
  //     );
  //     //setLoading(false);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error("API Error", err);
  //   }
  // };

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
        <div id="template" dangerouslySetInnerHTML={{ __html: body }} />
        <Form
          signature={signature}
          setSignature={setSignature}
          form={form}
          setForm={setForm}
        />
        <Proceed handleClick={createPdf} />
      </EmailContainer>
    </>
  );
}
