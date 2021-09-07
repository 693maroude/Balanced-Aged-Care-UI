import React, { useState } from "react";
import Modal from "./Modal";
import { Button, RemoveButton } from "./styles/Button";
import Form, { Label, Input, InputWrapper } from "./styles/Form";
import Signature, { SignatureContainer } from "./styles/Signature";
import Error from "./styles/Error";

const SignatureForm = ({ form, setForm, signature, setSignature }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Form>
        <InputWrapper>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
            autoComplete="off"
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="Signature">Signature:</Label>
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
              <Signature src={signature} />
              <RemoveButton onClick={() => setSignature("none")} />
            </SignatureContainer>
          )}
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="Date">Date:</Label>
          <Input
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
          />
        </InputWrapper>
      </Form>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setSignature={setSignature}
      />
      {form.err ? <Error> &#10097; {form.err} !!!</Error> : null}
    </>
  );
};

export default SignatureForm;
