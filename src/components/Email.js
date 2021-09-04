import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Proceed from "./ProceedButton";
import EmailContainer from "./styles/EmailContainer";
import Spinner from "./styles/Spinner";
import { Button, RemoveButton } from "./styles/Button";
import { HTML } from "./temp";

export default function Email() {
  const [body /*, setBody*/] = useState(HTML);
  const [loading /*, setLoading*/] = useState(false);
  const [signature, setSignature] = useState("none");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  //getBody

  //apointmentValue

  //const location

  useEffect(() => {
    if (loading === false) {
      const entry = document.getElementsByClassName("dynamic-entry");
      const signatureEntry = entry[1];
      signatureEntry.children[1].style.display = "none";

      const span = document.createElement("span");
      span.id = "signature-span";
      span.style.textAlign = "center";
      span.style.paddingBlock = "10px";
      span.style.borderRadius = "6px";

      signatureEntry.append(span);

      Array.from(entry).forEach((node) => {
        const type = node.getAttribute("data-type");
        const inputNode = node.children[1];
        if (type !== "signature") inputNode.disabled = false;
      });
    }
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    if (signature === "none") {
      ReactDOM.render(
        <>
          <Button onClick={openModal}>Create</Button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            signature={signature}
            setSignature={setSignature}
          />
        </>,
        document.getElementById("signature-span")
      );
    } else {
      const entry = document.getElementsByClassName("dynamic-entry");
      const signatureEntry = entry[1];
      signatureEntry.children[1].style.display = "inline";
      signatureEntry.children[2].style.display = "none";
      // signatureEntry.removeChild(signatureEntry.children[2]);

      const image = document.createElement("img");
      image.src = "";
      image.src = signature;
      image.style.position = "absolute";
      image.style.left = "1rem";
      image.style.bottom = "0rem";
      image.style.maxHeight = "45px";
      image.style.maxWidth = "120px";

      if (signatureEntry.children[1].childElementCount === 1)
        signatureEntry.children[1].append(image);
      else
        signatureEntry.children[1].replaceChildren(
          signatureEntry.children[1].children[0],
          image
        );

      const buttonSpan = document.createElement("span");
      buttonSpan.style.position = "absolute";
      buttonSpan.style.right = "10px";
      buttonSpan.style.top = "-20px";
      buttonSpan.id = "button-span";
      signatureEntry.children[1].append(buttonSpan);

      ReactDOM.render(
        <RemoveButton
          onClick={() => {
            signatureEntry.children[1].style.display = "none";
            signatureEntry.children[2].style.display = "inline";
            setSignature("none");
          }}
        />,
        document.getElementById("button-span")
      );
    }
  }, [signature, loading, showModal]);

  return loading ? (
    <Spinner />
  ) : (
    <EmailContainer>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Link to="/payment">
        <Proceed />
      </Link>
    </EmailContainer>
  );
}
