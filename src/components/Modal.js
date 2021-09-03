import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import TextCanvas from "./TextCanvas";
import { ModalBackground, ModalWrapper } from "./styles/Modal";
import { Button, CloseButton, ListButton } from "./styles/Button";
import List from "./styles/List";
import Input from "./styles/Input";

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
            <List>
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
                <div
                  style={{
                    backgroundColor: "white",
                    width: "475px",
                    height: "200px",
                    marginBlock: "10px",
                    marginInline: "auto",
                    borderRadius: "6px",
                  }}
                >
                  <SignatureCanvas
                    ref={sigPad}
                    canvasProps={{
                      width: 475,
                      height: 200,
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
                  <Input
                    type="text"
                    placeholder="Enter text"
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
                <TextCanvas
                  canvasText={canvasText}
                  setShowModal={setShowModal}
                  setSignature={setSignature}
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
