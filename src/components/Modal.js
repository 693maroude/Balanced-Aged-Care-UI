import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import TextCanvas from "./TextCanvas";
<<<<<<< HEAD
import {
  ModalBackground,
  ModalWrapper,
  InputButtonWrapper,
  Input,
  ButtonWrapper,
} from "../styles/Modal";
import { Button, CloseButton, ListButton } from "../styles/Button";
import List from "../styles/List";
=======
import { ModalBackground, ModalWrapper } from "./styles/Modal";
import { Button, CloseButton, ListButton } from "./styles/Button";
import List from "./styles/List";
import { Input } from "./styles/Form";
>>>>>>> b095c3cf1c0c4cc373671fbc452cdedd80ce470d

const Modal = ({ showModal, setShowModal, setSignature }) => {
  const sigPad = useRef({});
  const [underlineColor, setUnderlineColor] = useState({
    draw: "transparent",
    type: "var(--kalysys-blue)",
  });
  const [signatureMode, setSignatureMode] = useState("type");
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

              <li style={{ marginRight: "auto" }}>
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
            </List>
            <hr />
            {signatureMode === "type" ? (
              <>
                <InputButtonWrapper>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={inputValue}
                    onChange={({ target: { value } }) => setInputValue(value)}
                    autoFocus
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
            ) : (
              <>
                <br />
                <h6>Signature Preview: </h6>
                <div
                  style={{
                    backgroundColor: "white",
                    width: "475px",
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
                      width: 475,
                      height: 150,
                      className: "sigCanvas",
                    }}
                  />
                </div>
                <Button
                  onClick={() => {
                    sigPad.current.clear();
                  }}
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
<<<<<<< HEAD
=======
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginBlock: "10px",
                    flex: "row nowrap",
                  }}
                >
                  <input
                    style={Input}
                    type="text"
                    placeholder="Full Name"
                    value={inputValue}
                    onChange={({ target: { value } }) => setInputValue(value)}
                  />
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
                </div>
                <br />
                <h6>Signature Preview: </h6>
                <TextCanvas
                  setShowModal={setShowModal}
                  setSignature={setSignature}
                  setInputValue={setInputValue}
                  canvasText={canvasText}
                  setCanvasText={setCanvasText}
                />
              </>
>>>>>>> b095c3cf1c0c4cc373671fbc452cdedd80ce470d
            )}
          </ModalWrapper>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
