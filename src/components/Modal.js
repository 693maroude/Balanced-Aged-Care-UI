import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import TextCanvas from "./TextCanvas";
import {
  ModalBackground,
  ModalWrapper,
  InputButtonWrapper,
  Input,
  ButtonWrapper,
} from "./styles/Modal";
import { Button, CloseButton, ListButton } from "./styles/Button";
import List from "./styles/List";

const Modal = ({ showModal, setShowModal, setSignature }) => {
  const sigPad = useRef({});
  const [underlineColor, setUnderlineColor] = useState({
    draw: "var(--kalysys-blue)",
    type: "transparent",
  });
  const [signatureMode, setSignatureMode] = useState("draw");
  const [inputValue, setInputValue] = useState("");
  const [canvasText, setCanvasText] = useState("");
  return (
    <>
      {showModal ? (
        <ModalBackground>
          <ModalWrapper>
            <h4>Create New Signature</h4>
            <CloseButton
              aria-label="Close"
              onClick={() => setShowModal((prev) => !prev)}
            />
            <List direction={"row"}>
              <li style={{ marginLeft: "auto" }}>
                <ListButton
                  underlineColor={underlineColor.draw}
                  onClick={() => {
                    setUnderlineColor({
                      type: "transparent",
                      draw: "var(--kalysys-blue)",
                    });
                    setSignatureMode("draw");
                  }}
                >
                  Draw it in
                </ListButton>
              </li>
              <li style={{ marginRight: "auto" }}>
                <ListButton
                  underlineColor={underlineColor.type}
                  onClick={() => {
                    setUnderlineColor({
                      type: "var(--kalysys-blue)",
                      draw: "transparent",
                    });
                    setSignatureMode("type");
                  }}
                >
                  Type it in
                </ListButton>
              </li>
            </List>
            <hr />
            {signatureMode === "draw" ? (
              <>
                <br />
                <h6>Signature Preview: </h6>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "100% ",
                    height: "150px",
                    marginBlockStart: "16px",
                    marginBlockEnd: "20px",
                    marginInline: "auto",
                    borderRadius: "6px",
                  }}
                >
                  <SignatureCanvas
                    ref={sigPad}
                    canvasProps={{
                      className: "sigCanvas",
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    sigPad.current.clear();
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    if (sigPad.current.isEmpty()) setSignature("none");
                    else
                      setSignature(
                        sigPad.current.getTrimmedCanvas().toDataURL("image/png")
                      );
                    setShowModal((prev) => !prev);
                  }}
                >
                  Insert
                </Button>
              </>
            ) : (
              <>
                <InputButtonWrapper>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={inputValue}
                    onChange={({ target: { value } }) => setInputValue(value)}
                  />
                  <ButtonWrapper>
                    <Button
                      onClick={() => {
                        setCanvasText(inputValue);
                      }}
                    >
                      Create
                    </Button>
                    <Button
                      onClick={() => {
                        setCanvasText("");
                      }}
                    >
                      Clear
                    </Button>
                  </ButtonWrapper>
                </InputButtonWrapper>
                <h6>Signature Preview: </h6>
                <TextCanvas
                  setShowModal={setShowModal}
                  setSignature={setSignature}
                  setInputValue={setInputValue}
                  canvasText={canvasText}
                  setCanvasText={setCanvasText}
                />
              </>
            )}
          </ModalWrapper>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
