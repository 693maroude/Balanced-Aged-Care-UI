import React, { useState } from "react";
import Modal from "./Modal";
import { Button, RemoveButton } from "../styles/Button";
import Form, { Label, Input, InputWrapper } from "../styles/Form";
import Signature, { SignatureContainer } from "../styles/Signature";
import Error from "../styles/Error";

const SignatureForm = ({ signature, setSignature, form, setForm, err }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const disableEnter = (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };
  return (
    <>
      <form style={Form}>
        <div style={InputWrapper}>
          <label htmlFor="name" style={Label}>
            Name:
          </label>
          <input
            style={Input}
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            autoComplete="off"
            onKeyPress={disableEnter}
          />
        </div>

        <div style={InputWrapper}>
          <label htmlFor="Signature" style={Label}>
            Signature:
          </label>
          {signature === "none" ? (
            <Button
              onClick={() => {
                toggleModal();
              }}
              title="Create Signature"
            >
              Click to sign
            </Button>
          ) : (
            <SignatureContainer>
              <img src={signature} style={Signature} alt={form.name} />
              <RemoveButton
                id="remove-signature"
                title="Remove Signature"
                onClick={() => setSignature("none")}
              />
            </SignatureContainer>
          )}
        </div>

        <div style={InputWrapper}>
          <label htmlFor="Date" style={Label}>
            Date:
          </label>
          <input
            style={Input}
            type="date"
            name="date"
            value={form.date}
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            onKeyPress={disableEnter}
          />
        </div>
      </form>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setSignature={setSignature}
      />
      {err !== "none" ? <Error> &#10097; {err} !!!</Error> : null}
    </>
  );
};

export default SignatureForm;
