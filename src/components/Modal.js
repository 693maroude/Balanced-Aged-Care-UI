import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { ModalBackground, ModalWrapper } from "./styles/Modal";
import { Button, CloseButton } from "./styles/Button";
import List from "./styles/List";

const Modal = ({ showModal, setShowModal }) => {
  const sigPad = useRef({});
  var sigArray = [];
  return (
    <>
      {showModal ? (
        <ModalBackground>
          <ModalWrapper>
            <h4>Create New Signature</h4>
            <CloseButton
              aria-label="Close Payment"
              onClick={() => setShowModal((prev) => !prev)}
            />
            <List>
              <li style={{ marginLeft: "auto" }}>Type it in</li>
              <li style={{ marginRight: "auto" }}>Draw it in</li>
            </List>
            <hr />
            <SignatureCanvas
              ref={sigPad}
              canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            />
            <Button onClick={() => sigPad.current.clear()}>Clear</Button>
            <Button
              onClick={() => {
                sigArray = sigPad.current.toDataURL("image/png");
                console.log(sigArray);
              }}
            >
              Save
            </Button>
            <Button onClick={() => sigPad.current.fromDataURL(sigArray)}>
              Load
            </Button>
            {/* var img = new Image(); img.src = canvas.toDataURL(); document.body.appendChild(img); */}
          </ModalWrapper>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
