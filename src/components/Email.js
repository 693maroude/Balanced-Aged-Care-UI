import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import Proceed from "./ProceedButton";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import { Button, RemoveButton } from "./styles/Button";
import { HTML } from "./temp";
import { useLocation, useHistory } from "react-router-dom";
import { qs } from "query-string";
import { getAPI, postAPI } from "../api/axios";
import Handlebars from "handlebars";

export default function Email() {
  const [body /*, setBody*/] = useState(HTML);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [resolvedHTML, setResolvedHTML] = useState(null);

  // const location = useLocation();
  const history = useHistory();
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    getHTMLAndValues();
  }, []);

  // get the HTML template + its corresponding dynamic values
  const getHTMLAndValues = async () => {
    setLoading(true);

    // to get the params (emailTemplate id and recordValueId) from URL

    // console.log(window.location.href);
    // console.log(location);
    // console.log(qs.parse(location.search));

    // const { id, recordValueId } = qs.parse(location.search);
    // console.log(id, recordValueId);
    try {
      const HTML = await getAPI({ url: "getEmail", id: 108976 });
      const values = await getAPI({ url: "getAppointment", id: 158238 });
      console.log(HTML, values);
      setLoading(false);

      const data = {
        fee: 1000,
        "fee-schedule": {
          "service-type": "Retirement Village",
          "email-fee-pricing": "$990 or if paid on the day of appointment $880",
        },
      };

      const handleBarTemplate = Handlebars.compile(HTML);
      const resolvedTemplate = handleBarTemplate(data).replace("\n", " ");
      setResolvedHTML(resolvedTemplate);

      console.log("resolvedHTML --> ", resolvedHTML);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  const createPdf = async () => {
    const NameField =
      document.getElementsByClassName("dynamic-entry")[0].children[1].value;

    //Check whether the fields are empty
    if (signature === "none" || !NameField) {
      alert("fields missing");
      return;
    }

    //set html attribute value for PDF
    document
      .getElementsByClassName("dynamic-entry")[0]
      .children[1].setAttribute("value", NameField);

    setLoading(true);
    const url = "puppeteer";
    const id = "pdf";

    //button removed for pdf
    document.getElementById("button-span").remove();

    // getting HTML string from DOM node
    let template = document
      .getElementById("template")
      .outerHTML.replace("\n", " ");

    try {
      const pdfLink = await postAPI({ url, id, template });
      setPdfLink(pdfLink);
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

  // useEffect(() => {
  //   if (loading === false) {
  //     const entry = document.getElementsByClassName("dynamic-entry");
  //     const signatureEntry = entry[1];
  //     signatureEntry.children[1].style.display = "none";

  //     const span = document.createElement("span");
  //     span.id = "signature-span";
  //     span.style.textAlign = "center";
  //     span.style.paddingBlock = "10px";
  //     span.style.borderRadius = "6px";

  //     signatureEntry.append(span);

  //     Array.from(entry).forEach((node) => {
  //       const type = node.getAttribute("data-type");
  //       const inputNode = node.children[1];
  //       if (type !== "signature") inputNode.disabled = false;
  //     });
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   if (loading) return;

  //   if (signature === "none") {
  //     ReactDOM.render(
  //       <>
  //         <Button onClick={openModal}>Create</Button>
  //         <Modal
  //           showModal={showModal}
  //           setShowModal={setShowModal}
  //           signature={signature}
  //           setSignature={setSignature}
  //         />
  //       </>,
  //       document.getElementById("signature-span")
  //     );
  //   } else {
  //     const entry = document.getElementsByClassName("dynamic-entry");
  //     const signatureEntry = entry[1];
  //     signatureEntry.children[1].style.display = "inline";
  //     signatureEntry.children[2].style.display = "none";
  //     // signatureEntry.removeChild(signatureEntry.children[2]);

  //     const image = document.createElement("img");
  //     image.src = "";
  //     image.src = signature;
  //     image.style.position = "absolute";
  //     image.style.left = "1rem";
  //     image.style.bottom = "0rem";
  //     image.style.maxHeight = "45px";
  //     image.style.maxWidth = "120px";

  //     if (signatureEntry.children[1].childElementCount === 1)
  //       signatureEntry.children[1].append(image);
  //     else
  //       signatureEntry.children[1].replaceChildren(
  //         signatureEntry.children[1].children[0],
  //         image
  //       );

  //     const buttonSpan = document.createElement("span");
  //     buttonSpan.style.position = "relative";
  //     buttonSpan.style.right = "10px";
  //     buttonSpan.style.top = "-20px";
  //     buttonSpan.id = "button-span";
  //     signatureEntry.children[1].append(buttonSpan);

  //     ReactDOM.render(
  //       <RemoveButton
  //         onClick={() => {
  //           signatureEntry.children[1].style.display = "none";
  //           signatureEntry.children[2].style.display = "inline";
  //           setSignature("none");
  //         }}
  //       />,
  //       document.getElementById("button-span")
  //     );
  //   }
  // }, [signature, loading, showModal]);

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

        <Proceed handleClick={createPdf} />
      </EmailContainer>
    </>
  );
}
